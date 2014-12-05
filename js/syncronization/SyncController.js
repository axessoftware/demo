function SyncController(options) {
    var _self = this;
    var _options = null;

    function enableInsomnia() {
        if (window.hasOwnProperty('plugins') && window.plugins.hasOwnProperty('insomnia'))
            window.plugins.insomnia.keepAwake();
    }

    function disableInsomnia() {
        if (window.hasOwnProperty('plugins') && window.plugins.hasOwnProperty('insomnia'))
            window.plugins.insomnia.allowSleepAgain();
    }

    this.isInitialSync = function () {
        return !_options.storage.getServerBlob();
    };

    // send a download request
    function downloadChanges(deferred, statistics) {
        if (!deferred)
            deferred = new $.Deferred();

        if (!statistics)
            statistics = {};

        var request = new SyncFormatter();
        request.url = _options.downloadServiceUri;
        request.serverBlob = _options.storage.getServerBlob();
        request.deviceId = _options.deviceId;
        request.serverId = _options.serverId;

        request.sendRequest().then(function (response, server) {
            _options.storage.setServerIdentity(server);
            _options.storage.saveChanges(response.results).then(function () {
                _options.storage.setServerBlob(response.serverBlob);
                _options.storage.setSyncDate(new Date());
                statistics.downloaded = (statistics.downloaded || 0) + response.results.length;
                if (response.moreChangesAvailable)
                    downloadChanges(deferred, statistics);
                else
                    deferred.resolve(statistics);
            }, function (e) {
                deferred.reject(e);
            });
        }, function (e) {
            deferred.reject(e);
        });

        return deferred.promise();
    }

    // send an upload request
    function uploadChanges(deferred, statistics) {
        if (!deferred)
            deferred = new $.Deferred();

        if (!statistics)
            statistics = {};

        var request = new SyncFormatter();
        request.url = _options.uploadServiceUri;
        request.serverBlob = _options.storage.getServerBlob();
        request.deviceId = _options.deviceId;
        request.serverId = _options.serverId;

        _options.storage.enumerateChanges().then(function (changes) {
            if (changes.length <= 0) {
                deferred.resolve(statistics);
                return;
            }

            request.results = changes;
            request.sendRequest().then(function (response, server) {
                _options.storage.setServerIdentity(server);
                _options.storage.saveChanges(response.results, true).then(function () {
                    _options.storage.setServerBlob(response.serverBlob);
                    _options.storage.setSyncDate(new Date());

                    statistics.uploaded = (statistics.uploaded || 0) + changes.length;
                    deferred.resolve(statistics);
                }, function (e) {
                    deferred.reject(e);
                });
            }, function (e) {
                deferred.reject(e);
            });
        }, function (e) {
            deferred.reject(e);
        });

        return deferred.promise();
    }

    // initiate a sync
    this.sync = function () {
        var deferred = new $.Deferred();

        try {
            var statistics = {
                syncStart: new Date(),
                syncEnd: null,
                downloaded: 0,
                uploaded: 0
            };

            enableInsomnia();

            if (!_options.storage.getServerBlob())
                _options.direction = 'bidirectional';

            if (_options.direction == 'download')
                downloadChanges(null, statistics).then(function (statistics) {
                    _options.storage.commit().then(function () {
                        statistics.syncEnd = new Date();

                        disableInsomnia();
                        deferred.resolve(statistics);
                    }, function (e) {
                        disableInsomnia();
                        deferred.reject(e);
                    });
                }, function (e) {
                    _options.storage.rollback().done(function () {
                        disableInsomnia();
                        deferred.reject(e);
                    });
                });
            else if (_options.direction == 'upload')
                uploadChanges(null, statistics).then(function (statistics) {
                    _options.storage.commit().then(function () {
                        statistics.syncEnd = new Date();

                        disableInsomnia();
                        deferred.resolve(statistics);
                    }, function (e) {
                        disableInsomnia();
                        deferred.reject(e);
                    });
                }, function (e) {
                    _options.storage.rollback().done(function () {
                        disableInsomnia();
                        deferred.reject(e);
                    });
                });
            else if (_options.direction == 'bidirectional')
                $.when(downloadChanges(null, statistics), uploadChanges(null, statistics)).then(function (downloadStatistics, uploadStatistics) {
                    _options.storage.commit().then(function () {
                        statistics = {
                            syncStart: downloadStatistics.syncStart,
                            syncEnd: new Date(),
                            downloaded: downloadStatistics.downloaded,
                            uploaded: uploadStatistics.uploaded
                        };

                        disableInsomnia();
                        deferred.resolve(statistics);
                    }, function (e) {
                        disableInsomnia();
                        deferred.reject(e);
                    });
                }, function (e) {
                    _options.storage.rollback().done(function () {
                        disableInsomnia();
                        deferred.reject(e);
                    });
                });

        } catch (e)
        { deferred.reject(e); }

        return deferred.promise();
    };

    this.initialize = function (options) {
        _options = options;
        if (!_options)
            throw 'Null argument exception. (options)';

        if (!_options.direction)
            _options.direction = 'bidirectional';
    };

    /* Constructor */
    var __construct = function (options) {
        _self.initialize(options);
    }(options);
}