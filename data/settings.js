var Settings = function (prefix) {

    /* Singleton class paradigm */
    if (arguments.callee._singletonInstance)
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    var _self = this;
    var _prefix = prefix;

    this.__defineGetter__("username", function () {
        return Read('username');
    });

    this.__defineSetter__("username", function (value) {
        if (typeof (value) == 'undefined' || value == null)
            Delete('username');
        else
            Write('username', value);
    });

    this.__defineGetter__("password", function () {
        return Read('password');
    });

    this.__defineSetter__("password", function (value) {
        if (typeof (value) == 'undefined' || value == null)
            Delete('password');
        else
            Write('password', value);
    });

    this.__defineGetter__("isConnected", function () {
        return Read('isconnected');
    });

    this.__defineSetter__("isConnected", function (value) {
        if (typeof (value) == 'undefined' || value == null)
            Delete('isconnected');
        else
            Write('isconnected', value);
    });

    this.__defineGetter__("userId", function () {
        return Read('userid');
    });

    this.__defineSetter__("userId", function (value) {
        if (typeof (value) == 'undefined' || value == null)
            Delete('userid');
        else
            Write('userid', value);
    });

    this.__defineGetter__("user", function () {
        return Read('user');
    });

    this.__defineSetter__("user", function (value) {
        if (typeof (value) == 'undefined' || value == null)
            Delete('user');
        else
            Write('user', value);
    });

    this.__defineGetter__("userSettings", function () {
        return Read('userSettings');
    });

    this.__defineSetter__("userSettings", function (value) {
        if (typeof (value) == 'undefined' || value == null)
            Delete('userSettings');
        else
            Write('userSettings', value);
    });

    this.__defineGetter__("keepMeSignedIn", function () {
        return Read('keepmesignedin');
    });

    this.__defineSetter__("keepMeSignedIn", function (value) {
        if (typeof (value) == 'undefined' || value == null)
            Delete('keepmesignedin');
        else
            Write('keepmesignedin', value);
    });

    this.__defineGetter__("serverAddress", function () {
        return Read('serveraddress');
    });

    this.__defineSetter__("serverAddress", function (value) {
        if (typeof (value) == 'undefined' || value == null)
            Delete('serveraddress');
        else
            Write('serveraddress', value);
    });

    this.__defineGetter__("serverId", function () {
        return Read('serverid');
    });

    this.__defineSetter__("serverId", function (value) {
        if (typeof (value) == 'undefined' || value == null)
            Delete('serverid');
        else
            Write('serverid', value);
    });

    this.__defineGetter__("deviceId", function () {
        return Read('deviceid');
    });

    this.__defineSetter__("deviceId", function (value) {
        if (typeof (value) == 'undefined' || value == null)
            Delete('deviceid');
        else
            Write('deviceid', value);
    });

    this.__defineGetter__("defaultPrinter", function () {
        return Read('defaultprinter');
    });

    this.__defineSetter__("defaultPrinter", function (value) {
        if (typeof (value) == 'undefined' || value == null)
            Delete('defaultprinter');
        else
            Write('defaultprinter', value);
    });

    this.__defineGetter__("showSyncStatistics", function () {
        return Read('showsyncstatistics');
    });

    this.__defineSetter__("showSyncStatistics", function (value) {
        if (typeof (value) == 'undefined' || value == null)
            Delete('showsyncstatistics');
        else
            Write('showsyncstatistics', value);
    });

    this.__defineGetter__("lastSyncDate", function () {
        return Read('lastsyncdate');
    });

    this.__defineSetter__("lastSyncDate", function (value) {
        if (typeof (value) == 'undefined' || value == null)
            Delete('lastsyncdate');
        else
            Write('lastsyncdate', value);
    });

    this.getSyncDate = function (scope) {
        var value = Read((scope || "").toLowerCase() + '-syncdate');
        if (!value)
            return null;

        return new Date(value);
    };

    var Read = function (key) {
        if (!key)
            throw 'No valid key passed as parameter.';

        key = _prefix + '-' + key;
        value = localStorage.getItem(key);
        if (!value)
            return value;

        value = $.base64.decode(value);

        try { value = JSON.parse(value); }
        catch (e) { return value; }

        return value;
    };

    var Write = function (key, value) {
        if (!key)
            throw 'No valid key passed as parameter.';

        if (value == undefined)
            return;

        key = _prefix + '-' + key;
        if (typeof value === 'object') {
            value = $.base64.encode(JSON.stringify(value));
            localStorage.setItem(key, value);
        }
        else
            localStorage.setItem(key, $.base64.encode(value));
    };

    var Delete = function (key) {
        if (!key)
            throw 'No valid key passed as parameter.';

        key = _prefix + '-' + key;
        localStorage.removeItem(key);
    };

    this.DeleteKey = function (key) {
        _self.Delete(key);
    }
};
