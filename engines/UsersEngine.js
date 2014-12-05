function UsersEngine(appInfo, context, settings) {
    /* this proxy */
    var _self = this;

    var _appInfo = null;
    var _context = null;
    var _settings = null;

    this.initialized = false;

    /* Singleton class paradigm */
    if (arguments.callee._singletonInstance)
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    var getUserByUsername = function (username) {
        var deferred = new $.Deferred();

        try {
            if (!username)
                throw 'Null argument exception. (username)';

            _context.Users.first(
             function (user) { return user.Username == this.username }, { username: username }).then(function (user) {
                 deferred.resolve(user);
             }, function (e) {
                 deferred.resolve(null);
             });
        } catch (e)
        { deferred.resolve(null); }

        return deferred.promise();
    };

    var getUserById = function (id) {
        var deferred = new $.Deferred();

        try {
            if (!id)
                throw 'Null argument exception. (id)';

            _context.Users.first(function (user) { return user.Id == this.id }, { id: id }).then(function (user) {
                deferred.resolve(user);
            }, function (e) {
                deferred.resolve(null);
            });
        } catch (e)
        { deferred.resolve(null); }

        return deferred.promise();
    };

    this.login = function (username, password) {
        var deferred = new $.Deferred();

        try {
            if (!username)
                throw 'Null argument exception. (username)';

            if (!password)
                throw 'Null argument exception. (password)';

            getUserByUsername(username).then(function (user) {
                try {
                    if (!user)
                        throw 'Nume de utilizator sau parolă nevalide.';
                    else if (user.IsAgent == false)
                        throw 'Utilziatorul nu este setat ca agent. Contactează administratorul de sistem.';
                    else if (user.IsActive == false)
                        throw 'Utilizatorul a fost dezactivat. Contactează administratorul de sistem.';
                    else if (user.IsBlocked == true)
                        throw 'Utilizatorul a fost blocat. Contactează administratorul de sistem.';
                    else if (user.Password.toLowerCase() !== CryptoJS.SHA1(password).toString().toLowerCase())
                        throw 'Nume de utilizator sau parolă nevalide.';

                    _settings.username = username;
                    _settings.password = password;
                    _settings.userId = user.Id;
                    _settings.user = user;
                    _settings.isConnected = true;

                    deferred.resolve();
                } catch (e)
                { deferred.reject(e); }
            }, function (e) {
                deferred.reject(e);
            });
        } catch (e)
        { deferred.reject(e); }

        return deferred.promise();
    };

    this.check = function (id) {
        var deferred = new $.Deferred();

        try {
            if (!id)
                throw 'Null argument exception. (id)';

            getUserById(id).then(function (user) {
                try {
                    if (!user)
                        throw 'Nume de utilizator sau parolă nevalide.';
                    else if (user.IsAgent == false)
                        throw 'Utilziatorul nu este setat ca agent. Contactează administratorul de sistem.';
                    else if (user.IsActive == false)
                        throw 'Utilizatorul a fost dezactivat. Contactează administratorul de sistem.';
                    else if (user.IsBlocked == true)
                        throw 'Utilizatorul a fost blocat. Contactează administratorul de sistem.';

                    _settings.userId = user.Id;
                    _settings.user = user;
                    _settings.isConnected = true;

                    deferred.resolve();
                } catch (e)
                { deferred.reject(e); }
            }, function (e) {
                deferred.reject(e);
            });
        } catch (e)
        { deferred.reject(e); }

        return deferred.promise();
    };

    this.logout = function () {
        var deferred = new $.Deferred();

        if (_settings.isConnected == true) {
            _settings.userId = null;
            _settings.user = null;
            _settings.isConnected = false;
        }

        deferred.resolve(null);

        return deferred.promise();
    };

    this.getUserSettings = function (userId) {
        var deferred = new $.Deferred();

        try {
            var model = window.app.data.model.Entities['Users_Settings'];
            if (!model)
                throw 'Entity type not defined.';

            model.all().filter("IdUser", '=', userId).and(new persistence.PropertyFilter("IsActive", '=', true)).list(function (records) {
                try {
                    var mapped = $.map(records, function (record, index) {
                        return model.toObject(item);
                    });

                    deferred.resolve(mapped);
                } catch (e)
                { deferred.reject(e.toString().localize()); }
            });
        } catch (e)
        { deferred.reject(e.toString().localize()); }

        return deferred.promise();
    };

    this.clearObsoleteData = function () {
        var deferred = $.Deferred();

        try {
            deferred.resolve();
        } catch (e) {
            deferred.reject(e.toString().localize());
        }

        return deferred.promise();
    };

    this.initialize = function (appInfo, context, settings) {
        _appInfo = appInfo;
        if (!_appInfo)
            throw 'Null argument exception. (appInfo)';

        _context = context;
        if (!_context)
            throw 'Null argument exception. (context)';

        _settings = settings
        if (!_settings)
            throw 'Null argument exception. (settings)';

        _self.initialized = true;
    };

    var __construct = function (appInfo, context, settings) {
        _self.initialize(appInfo, context, settings);
    }(appInfo, context, settings);
};