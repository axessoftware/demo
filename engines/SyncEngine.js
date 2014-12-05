function SyncEngine(appInfo, context, scopes, settings) {
    /* this proxy */
    var _self = this;

    /* Singleton class paradigm */
    if (arguments.callee._singletonInstance)
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    /* Attributes */
    var _appInfo = null;
    var _context = null;
    var _scopes = null;
    var _settings = null;
    var _serverAddress = null;

    var _downloadSufix = "/DownloadChanges";
    var _uploadSufix = "/UploadChanges";

    this.isInitialSync = function (scope) {
        return !window.helpers.persistence.read((_appInfo.id + '-' + scope + '-serverblob').replaceAll('_', '-').toLowerCase());
    };

    /* Methods */
    this.initialize = function (appInfo, context, scopes, settings) {
        _appInfo = appInfo;
        if (!_appInfo)
            throw 'Null argument exception. (appInfo)';

        _context = context;
        if (!_context)
            throw 'Null argument exception. (context)';

        _scopes = scopes;
        if (!_scopes)
            throw 'Null argument exception. (scopes)';

        _settings = settings
        if (!_settings)
            throw 'Null argument exception. (settings)';

        if (Object.keys(_scopes || {}).length == 0)
            throw 'No sync scopes defined.'
    };

    this.sync = function (scope, filters) {
        var deferred = new $.Deferred();

        try {
            var _deviceId = _settings.deviceId;
            var _serverId = _settings.serverId;
            var _service = null;
            var _scope = _scopes[scope];
            if (!_scope)
                throw 'Scope \'' + scope + '\' is not defined.'

            _serverAddress = _settings.serverAddress
            if (!_serverAddress)
                throw 'Please check settings for correct server address.';

            if (_serverAddress && !_serverAddress.endsWith('/'))
                _serverAddress += '/';

            _service = _scope.service;
            if (!_service)
                throw 'No service endpoint defined for scope \'' + scope + '\'.';

            _scope.name = _scope.name || scope;

            var _downloadUrl = _serverAddress + _service + '/' + _scope.name + _downloadSufix;
            var _uploadUrl = _serverAddress + _service + '/' + _scope.name + _uploadSufix;

            if (!filters)
                filters = {};

            var parameters = {};
            for (var entity in _scope.entities) {
                var _filters = _scope.entities[entity].filters;
                if (!_filters)
                    continue;

                for (var i = 0; i < _filters.length; i++) {
                    var key = _filters[i];
                    if (!filters.hasOwnProperty(key))
                        continue;

                    parameters[key] = filters[key];
                }
            }

            var query = '?';
            var count = Object.keys(parameters).length;
            var counter = 0;
            if (count > 0) {
                for (var parameter in parameters) {
                    query += parameter + '=' + encodeURIComponent(parameters[parameter]) + (counter < count - 1 ? '&' : '');
                    ++counter;
                }

                _downloadUrl += query;
                _uploadUrl += query;
            }

            var _storage = new SyncStorage(_appInfo, _context, _scopes, _scope.name);
            var _options = {
                scope: scope,
                storage: _storage,
                downloadServiceUri: _downloadUrl,
                uploadServiceUri: _uploadUrl,
                deviceId: _deviceId,
                serverId: _serverId
            };

            var controller = new SyncController(_options);

            controller.sync().then(function (statistics) {
                _settings.lastSyncDate = new Date();
                deferred.resolve(statistics);
            }, function (e) {
                deferred.reject(e);
            });
        } catch (e)
        { deferred.reject(e); }

        return deferred.promise();
    };

    /* Constructor */
    var __construct = function (appInfo, context, scopes, settings) {
        _self.initialize(appInfo, context, scopes, settings);
    }(appInfo, context, scopes, settings);
};