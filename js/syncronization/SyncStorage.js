function SyncStorage(appInfo, context, scopes, scope, connection) {
    var _self = this;
    var _id = GUID();

    /* Attributes */
    var _appInfo = null;
    var _context = null;
    var _scopes = null;
    var _scopeName = null;
    var _scope = null;
    var _scopeTables = null;
    var _transaction = null;

    var _databaseName = null;
    var _serverBlobScopeStorageKey = null;
    var _serverSyncDateScopeStorageKey = null;
    var _serverIdentityStorageKey = null;

    var _model = undefined;
    var _map = {};
    var _pkMap = {};
    var _templates = {};

    var _serverBlobBackup = undefined;
    var _syncDateBackup = undefined;

    var _connection = undefined;
    var _cache = {};

    /* Methods */
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    function GUID() {
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    function constructScopeCache() {
        _cache = {};

        var column = null;
        var primaryKey = null;
        var columns = null;
        var template = null;
        var variables = null;
        var definition = null;
        var query = null;
        var type = null;

        var tables = Object.keys(_scopeTables);
        var table = null;
        var entity = null;
        for (var index = 0; index < tables.length; index++) {
            table = tables[index];
            entity = _context[table];
            if (!entity)
                continue;

            type = (_scopeName ? _scopeName + '.' : '') + table;
            columns = entity.elementType.getFieldNames().sort();
            column = null;

            variables = [];
            definition = {};
            for (var i = 0; i < columns.length; i++) {
                column = columns[i];
                variables.push('?');
                definition[column] = entity.elementType.field(column).memberDefinition.originalType;
                if ((entity.elementType.memberDefinitions['$' + column].key || false) == true)
                    primaryKey = column;
            }

            query = "SELECT " + columns.join() + " FROM " + table + " WHERE COALESCE(_isDirty, 0) = 1";

            template = {
                'deleteByTempId': 'DELETE FROM ' + table + ' WHERE _tempId = ?',
                'deleteByUri': 'DELETE FROM ' + table + ' WHERE _uri = ?',
                'insertOrReplace': 'INSERT OR REPLACE INTO ' + table + '(' + columns.join() + ') VALUES (' + variables.join() + ')',
                'clearFlagsByTempId': 'UPDATE ' + table + ' SET _isDirty = 0 WHERE _tempId = ? AND COALESCE(_isDirty, 0) = 1',
                'clearFlagsByUri': 'UPDATE ' + table + ' SET _isDirty = 0 WHERE _uri = ? AND COALESCE(_isDirty, 0) = 1',
                'clearFlagsByKey': 'UPDATE ' + table + ' SET _isDirty = 0, _uri = ?, _tempId = ? WHERE ' + primaryKey + ' = ? AND COALESCE(_isDirty, 0) = 1'
            };

            _cache[table] = { table: table, type: type, columns: columns, primaryKey: primaryKey, definition: definition, query: query, template: template };
        }
    };

    function getCommand(object) {
        if (!object)
            throw 'Null argument exception. (object)';

        if (object.__syncError)
            throw object.__syncError.errorDescription;

        var _type = null;
        var _properties = {};

        if ((index = object.__metadata.type.lastIndexOf('.')) > -1)
            _type = object.__metadata.type.substring(index + 1);
        else
            _type = object.__metadata.type;

        var _cachedItem = _cache[_type];
        if (!_cachedItem)
            throw 'Cache has not been initialized.';

        var definition = _cachedItem.definition;
        var template = _cachedItem.template;
        var columns = _cachedItem.columns;
        var primaryKey = _cachedItem.primaryKey;
        var column = null;

        var converted = {};
        for (var property in definition)
            if (property.indexOf('__') == 0)
                continue;
            else
                converted[property] = convertJsonValueToDbValue(object[property], definition[property]);

        converted._isDirty = convertJsonValueToDbValue(object.__metadata.isDirty ? object.__metadata.isDirty : false, definition["_isDirty"]);
        converted._isDeleted = convertJsonValueToDbValue(object.__metadata.isDeleted ? object.__metadata.isDeleted : false, definition["_isDeleted"]);
        converted._uri = convertJsonValueToDbValue(object.__metadata.uri, definition["_uri"]);
        converted._tempId = convertJsonValueToDbValue(object.__metadata.tempId, definition["_tempId"]);

        if (object.__syncConflict) {
            if (object.__syncConflict.conflictResolution == 'ServerWins') {

            } else if (object.__syncConflict.conflictResolution == 'ClientWins') {

            }

            converted._isDirty = convertJsonValueToDbValue(false, definition["_isDirty"]);
            converted._isDeleted = convertJsonValueToDbValue(false, definition["_isDeleted"]);
            converted._uri = convertJsonValueToDbValue(null, definition["_uri"]);
            converted._tempId = convertJsonValueToDbValue(null, definition["_tempId"]);
        }

        var clearFlags = object.__metadata.clearFlags || false;

        var _statement = '';
        var _parameters = [];
        if (converted._isDeleted == true) {
            if (converted._tempId) {
                _statement = template.deleteByTempId;
                _parameters.push(converted['_tempId']);
            }
            else if (converted._uri) {
                _statement = template.deleteByUri;
                _parameters.push(converted['_uri']);
            }
        }
        else if (clearFlags == true) {
            if (converted[primaryKey]) {
                _statement = template.clearFlagsByKey;
                _parameters.push(converted['_uri']);
                _parameters.push(converted['_tempId']);
                _parameters.push(converted[primaryKey]);
            }
        }
        else {
            _statement = template.insertOrReplace;
            for (var i = 0; i < columns.length; i++) {
                column = columns[i];
                _parameters.push(converted[column]);
            }
        }

        return { statement: _statement, parameters: _parameters };
    };

    function convertDbValueToJsonValue(value, type) {
        if ((index = type.lastIndexOf(".")) != -1)
            type = type.substring(index + 1);

        if (value == undefined)
            return null;

        if (type == "Guid")
            return value;
        else if (type == "Boolean") {
            if (value == 1 || value == "1")
                return true;

            if (value == 0 || value == "0")
                return false;
        }
        else if (type == "DateTime") {
            var temp = parseInt(value);
            var date = new Date(temp);
            var utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

            return "\/Date(" + utc.getTime() + ")\/";
        } else if (type == "String") {
            if (value == "null" || value == "undefined")
                return null;

            return value.toString();
        } else if (type == "Double")
            return parseFloat(value);
        else if (type == "Int32")
            return parseInt(value);
    };

    function convertJsonValueToDbValue(value, type) {
        if ((index = type.lastIndexOf(".")) != -1)
            type = type.substring(index + 1);

        if (value == undefined)
            return null;

        if (type == "Guid")
            return value;
        else if (type == "Boolean") {
            if (value == true || value == "true")
                return 1

            if (value == false || value == "false")
                return 0;
        }
        else if (type == "DateTime") {
            if (value == "null" || value == "undefined")
                return null;

            var utc = eval('new ' + value.replaceAll("\/", ""));

            return utc.getTime();
        } else if (type == "String") {
            if (value == "null" || value == "undefined")
                return null;

            return value.toString();
        } else if (type == "Double")
            return parseFloat(value);
        else if (type == "Int32")
            return parseInt(value);
    };

    function createSyncEntity(object, type, definition) {
        var excluded = ["_isDirty", "_isDeleted", "_uri", "_tempId"];

        var column = null;
        var cType = null;
        var columns = Object.keys(object).filter(function (column) {
            return !excluded.includes(column);
        });

        var entity = {};

        for (var index = 0; index < columns.length; index++) {
            column = columns[index];
            cType = definition[column];

            entity[column] = convertDbValueToJsonValue(object[column], cType);
        }

        entity.__metadata = {};
        entity.__metadata.isDirty = convertDbValueToJsonValue(object["_isDirty"], definition["_isDirty"]);
        entity.__metadata.isDeleted = convertDbValueToJsonValue(object["_isDeleted"], definition["_isDeleted"]);
        entity.__metadata.uri = convertDbValueToJsonValue(object["_uri"], definition["_uri"]);
        entity.__metadata.tempId = convertDbValueToJsonValue(object["_tempId"], definition["_tempId"]);
        entity.__metadata.type = type;

        return entity;
    };

    this.getDatabaseConnection = function () {
        return openDatabase(_databaseName, '', 'database', 100 * 1024 * 1024);
    };

    this.getServerBlob = function () {
        return window.helpers.persistence.read(_serverBlobScopeStorageKey);
    };

    this.setServerBlob = function (blob) {
        window.helpers.persistence.write(_serverBlobScopeStorageKey, blob);
    };

    this.getServerIdentity = function () {
        return window.helpers.persistence.read(_serverIdentityStorageKey);
    };

    this.setServerIdentity = function (identity) {
        window.helpers.persistence.write(_serverIdentityStorageKey, identity);
    };

    this.getSyncDate = function () {
        return window.helpers.persistence.read(_serverSyncDateScopeStorageKey);
    };

    this.setSyncDate = function (date) {
        window.helpers.persistence.write(_serverSyncDateScopeStorageKey, date);
    };

    // get client changes
    this.enumerateChanges = function () {
        var deferred = new $.Deferred();

        var deferreds = $.map(Object.keys(_scopeTables), function (table) {
            var _cachedItem = _cache[table];
            if (_cachedItem) {
                var type = _cachedItem.type;
                var query = _cachedItem.query;
                var definition = _cachedItem.definition;

                return (function (type, query) {
                    var d = new $.Deferred();

                    var records = [];
                    _connection.transaction(function (tx) {
                        tx.executeSql(query, [], function (tx, result) {
                            var length = result.rows.length
                            for (i = 0; i < length; i++)
                                records.push(result.rows.item(i));
                        });
                    }, function (tx) {
                        d.reject(tx.message);
                    }, function (tx) {
                        d.resolve({ type: type, definition: definition, changes: records || [] });
                    });

                    return d.promise();
                })(type, query)
            }
        });

        $.when.all(deferreds).then(function (objects) {
            objects = objects.filter(function (current) {
                return current.changes.length > 0;
            });

            var changes = [];
            var current = null;
            var buffer = null;
            for (var index = 0; index < objects.length; index++) {
                current = objects[index];

                buffer = $.map(current.changes, function (item) {
                    return createSyncEntity(item, current.type, current.definition);
                });

                if (buffer.length > 0)
                    changes.push.apply(changes, buffer);
            }

            deferred.resolve(changes);
        }, function (e) {
            deferred.reject(e);
        });

        return deferred.promise();
    };

    // saves server changes
    this.saveChanges = function (entities, clearFlags) {
        var deferred = new $.Deferred();

        if (!entities)
            entities = [];

        try {
            var queue = $.map(entities, function (current) {
                if (clearFlags == true)
                    current.__metadata.clearFlags = true;

                var value = JSON.stringify(current);
                var key = CryptoJS.SHA1(value).toString().toLowerCase();

                return { key: key, value: value };
            });

            var kv = null;
            _connection.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS SYNC_BUFFER (key unique, value, owner, priority)');
                for (var index = 0; index < queue.length; index++) {
                    kv = queue[index];
                    tx.executeSql('INSERT OR REPLACE INTO SYNC_BUFFER (key, value, owner, priority) VALUES (?, ?, ?, ?)', [kv.key, kv.value, _id, index]);
                }
            }
            , function (tx) { deferred.reject(tx.message); }
            , function (tx) { deferred.resolve(); });

        } catch (e)
        { deferred.reject(e); }

        return deferred.promise();
    };

    // commit changes
    this.commit = function () {
        var deferred = new $.Deferred();

        try {
            var commitSyncBufferTask = function () {
                var d = new $.Deferred();

                var recordCount = 0;
                var pageCount = 0;
                var pageIndex = 0;

                var limit = window.batchSize || 50;
                var offset = 0

                var record = null;
                var key = null;
                var value = null;
                var command = null;

                _connection.transaction(function (tx) {
                    try {
                        tx.executeSql('CREATE TABLE IF NOT EXISTS SYNC_BUFFER (key unique, value, owner, priority)');
                        tx.executeSql('SELECT COUNT(1) AS QueueLength FROM SYNC_BUFFER WHERE owner = ?', [_id], function (tx, results) {
                            if (results.rows.length > 0) {
                                recordCount = parseInt(results.rows.item(0).QueueLength);
                                pageCount = parseInt(recordCount / limit) + (parseInt(recordCount % limit) == 0 ? 0 : 1);
                                pageIndex = 0;

                                for (pageIndex = 0; pageIndex < pageCount; pageIndex++) {
                                    offset = pageIndex * limit;
                                    tx.executeSql('SELECT key, value, owner, priority FROM SYNC_BUFFER WHERE owner = ? ORDER BY priority LIMIT ? OFFSET ?', [_id, limit, offset], function (tx, results) {
                                        record = null;
                                        key = null;
                                        value = null;
                                        command = null;

                                        for (var i = 0; i < results.rows.length; i++)
                                            try {
                                                record = results.rows.item(i);
                                                key = record.key;
                                                value = JSON.parse(record.value);

                                                command = getCommand(value);
                                                if (!(!command))
                                                    tx.executeSql(command.statement, command.parameters);
                                            }
                                            catch (e) {
                                                d.reject(e);
                                                return true;
                                            }
                                    });
                                }
                            }
                        });
                    } catch (e) {
                        d.reject(e);
                        return true;
                    };
                }, function (tx) {
                    d.reject(tx.message);
                }, function (tx) {
                    d.resolve();
                });

                return d.promise();
            };

            var purgeSyncBufferTask = function () {
                var d = new $.Deferred();

                _connection.transaction(function (tx) {
                    tx.executeSql('DELETE FROM SYNC_BUFFER', []);
                    //tx.executeSql('PRAGMA shrink_memory', []);
                }, function (tx) {
                    d.reject(tx.message);
                }, function (tx) {
                    d.resolve();
                });

                return d.promise();
            };

            commitSyncBufferTask().then(function () {
                purgeSyncBufferTask().then(function () {
                    deferred.resolve();
                }, function (e) {
                    deferred.reject(e);
                });
            }, function (e) {
                deferred.reject(e);
            });

        } catch (e)
        { deferred.reject(e); }

        return deferred.promise();
    };

    // rollback changes
    this.rollback = function () {
        var deferred = new $.Deferred();

        var self = this;
        try {

            var purgeSyncBufferTask = (function () {
                var d = new $.Deferred();

                _connection.transaction(function (tx) {
                    tx.executeSql('DELETE FROM SYNC_BUFFER WHERE owner = ?', [_id]);
                    //tx.executeSql('PRAGMA shrink_memory', []);
                }, function (tx) {
                    d.resolve();
                }, function (tx) {
                    d.resolve();
                });

                return d.promise();
            })()

            purgeSyncBufferTask.done(function () {
                self.setServerBlob(_serverBlobBackup);
                self.setSyncDate(_syncDateBackup);
            });

        } catch (e)
        { deferred.reject(e); }

        return deferred.promise();
    };

    this.initialize = function (appInfo, context, scopes, scope, connection) {
        try {

            _appInfo = appInfo;
            if (!_appInfo)
                throw 'Null argument exception. (appInfo)';

            _context = context;
            if (!_context)
                throw 'Null argument exception. (context)';

            _scopes = scopes;
            if (!_scopes)
                throw 'Null argument exception. (scopes)';

            _scopeName = scope;
            if (!_scopeName)
                throw 'Null argument exception. (scope)';

            _scope = _scopes[_scopeName] || { entities: {} };
            _scopeTables = _scope.entities || {};

            _databaseName = _appInfo.databaseName;
            _serverBlobScopeStorageKey = (_appInfo.id + '-' + _scope.name + '-serverblob').replaceAll('_', '-').toLowerCase();
            _serverSyncDateScopeStorageKey = (_appInfo.id + '-' + _scope.name + '-syncdate').replaceAll('_', '-').toLowerCase();
            _serverIdentityStorageKey = (_appInfo.id + '-serveridentity').replaceAll('_', '-').toLowerCase();

            constructScopeCache();

            _connection = connection;
            if (!_connection)
                _connection = _self.getDatabaseConnection();

            _serverBlobBackup = this.getServerBlob();
            _syncDateBackup = this.getSyncDate();
        } catch (e)
        { throw e; }
    };

    /* Constructor */
    var __construct = function (appInfo, context, scopes, scope, connection) {
        _self.initialize(appInfo, context, scopes, scope, connection);
    }(appInfo, context, scopes, scope, connection);
};