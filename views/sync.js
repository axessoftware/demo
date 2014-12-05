SFA.sync = function (params) {
    var doSyncUsersScope = function () {
        var deferred = new $.Deferred();

        var name = 'UsersScope';
        var filters = null;

        SFA.app.engines.SyncEngine.sync(name, filters).then(function (statistics) {
            deferred.resolve(statistics);
        }, function (e) {
            deferred.reject(e);
        });

        return deferred.promise();
    };

    var doSyncStaticsScope = function () {
        var deferred = new $.Deferred();

        var name = 'StaticsScope';
        var filters = null;

        SFA.app.engines.SyncEngine.sync(name, filters).then(function (statistics) {
            deferred.resolve(statistics);
        }, function (e) {
            deferred.reject(e);
        });

        return deferred.promise();
    };

    var doSyncGlossariesScope = function () {
        var deferred = new $.Deferred();

        var name = 'GlossariesScope';
        var filters = { IdAgent: SFA.app.settings.global.userId };

        SFA.app.engines.SyncEngine.sync(name, filters).then(function (statistics) {
            deferred.resolve(statistics);
        }, function (e) {
            deferred.reject(e);
        });

        return deferred.promise();
    };

    var doSyncFinancialScope = function () {
        var deferred = new $.Deferred();

        var name = 'FinancialScope';
        var filters = null;

        SFA.app.engines.SyncEngine.sync(name, filters).then(function (statistics) {
            deferred.resolve(statistics);
        }, function (e) {
            deferred.reject(e);
        });

        return deferred.promise();
    };

    var doSyncActivitiesScope = function () {
        var deferred = new $.Deferred();

        var name = 'ActivitiesScope';
        var filters = { IdAgent: SFA.app.settings.global.userId };

        SFA.app.engines.SyncEngine.sync(name, filters).then(function (statistics) {
            deferred.resolve(statistics);
        }, function (e) {
            deferred.reject(e);
        });

        return deferred.promise();
    };

    var map = { 'UsersScope': doSyncUsersScope, 'StaticsScope': doSyncStaticsScope, 'GlossariesScope': doSyncGlossariesScope, 'FinancialScope': doSyncFinancialScope, 'ActivitiesScope': doSyncActivitiesScope }

    var busy = ko.observable(false);

    var syncProgressVisible = ko.observable(false);

    var popupText = ko.observable(null);
    var popupTitle = ko.observable(null);

    var syncDisabled = ko.observable(false);

    var scopesList = ko.observableArray([]);

    var onSyncAllClick = function (e) {
        if (busy() == true)
            return;

        popupText(null);
        busy(true);
        syncProgressVisible(true);

        var deferreds = [];
        var current = null;

        for (var scope in map) {
            current = map[scope];
            deferreds.push(current());
        }

        $.when.all(deferreds).then(function (objects) {
            loadScopes();

            syncProgressVisible(false);
            busy(false);

            var statistics = {
                downloaded: 0,
                uploaded: 0,
                syncStart: null,
                syncEnd: null
            };

            var current = null;
            for (var index = 0; index < objects.length; index++) {
                current = objects[index];
                if (statistics.syncStart == null || statistics.syncStart > current.syncStart)
                    statistics.syncStart = current.syncStart;

                if (statistics.syncEnd == null || statistics.syncEnd < current.syncEnd)
                    statistics.syncEnd = current.syncEnd;

                statistics.downloaded += current.downloaded;
                statistics.uploaded += current.uploaded;
            }

            if ((SFA.app.settings.global.showSyncStatistics || false) == true)
                DevExpress.ui.dialog.confirm("Doriți să vedeți statisticile sincronizarii?", "Axes Software SFA").done(function (dialogResult) {
                    if (dialogResult) {
                        var end = statistics.syncEnd.getTime();
                        var start = statistics.syncStart.getTime();

                        var diff = end - start;

                        var now = new Date();
                        var duration = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
                        duration.setMilliseconds(diff);

                        var text = "Descărcări: " + statistics.downloaded + "\r\n" +
                                   "Încărcări: " + statistics.uploaded + "\r\n" +
                                   "Durată: " + duration.format('hh:mm:ss');

                        popupTitle("Statistici sincronizare");
                        popupText(text);
                        showPopup();
                    }
                });
        }, function (e) {
            syncProgressVisible(false);
            busy(false);

            DevExpress.ui.dialog.confirm("Au fost întâmpinate probleme la sincronizare.\r\nDoriți să vedeți desfășurătorul?", "Axes Software SFA").done(function (dialogResult) {
                if (dialogResult) {
                    popupTitle("Probleme sincronizare");
                    popupText(e.toString());
                    showPopup();
                }
            });
        });
    };

    var onScopeClick = function (e) {
        if (busy() == true)
            return;

        var item = e.model;
        if (!item)
            return;

        popupText(null);
        busy(true);
        syncProgressVisible(true);

        map[item.name]().then(function (statistics) {
            loadScopes();

            syncProgressVisible(false);
            busy(false);

            if ((SFA.app.settings.global.showSyncStatistics || false) == true)
                DevExpress.ui.dialog.confirm("Doriți să vedeți statisticile sincronizarii?", "Axes Software SFA").done(function (dialogResult) {
                    if (dialogResult) {
                        var end = statistics.syncEnd.getTime();
                        var start = statistics.syncStart.getTime();

                        var diff = end - start;

                        var now = new Date();
                        var duration = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
                        duration.setMilliseconds(diff);

                        var text = "Descărcări: " + statistics.downloaded + "\r\n" +
                                   "Încărcări: " + statistics.uploaded + "\r\n" +
                                   "Durată: " + duration.format('hh:mm:ss');

                        popupTitle("Statistici sincronizare");
                        popupText(text);
                        showPopup();
                    }
                });
        }, function (e) {
            syncProgressVisible(false);
            busy(false);

            DevExpress.ui.dialog.confirm("Au fost întâmpinate probleme la sincronizare.\r\nDoriți să vedeți desfășurătorul?", "Axes Software SFA").done(function (dialogResult) {
                if (dialogResult) {
                    popupTitle("Probleme sincronizare");
                    popupText(e.toString());
                    showPopup();
                }
            });
        });
    };

    var loadScopes = function () {
        var items = [{ caption: 'Utilizatori', name: 'UsersScope' }, { caption: 'Statice', name: 'StaticsScope' }, { caption: 'Nomenclatoare', name: 'GlossariesScope' }, { caption: 'Stocuri și prețuri', name: 'FinancialScope' }, { caption: 'Activități', name: 'ActivitiesScope' }];
        var scope = null;
        for (var index = 0; index < items.length; index++)
            items[index].lastSync = SFA.app.settings.global.getSyncDate(items[index].name);

        scopesList(items);
    };

    function onViewShowing() {
        loadScopes();
    };

    function onViewShown() {

    };

    var showPopup = function () {
        $("#popup").data("dxPopup").show();
    };

    var hidePopup = function () {
        $("#popup").data("dxPopup").hide();
    };

    return {
        handlers: {
            sync: {
                click: onSyncAllClick,
                disabled: syncDisabled
            }
        },
        scopes: {
            list: scopesList,
            click: onScopeClick
        },
        progress: {
            sync: {
                visible: syncProgressVisible
            }
        },
        popup: {
            show: showPopup,
            hide: hidePopup,
            text: popupText,
            title: popupTitle
        },
        viewShowing: onViewShowing,
        viewShown: onViewShown
    };
};