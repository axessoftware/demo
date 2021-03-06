﻿(function ($, DX, undefined) {
    var operatorMap = {
        "=": "==",
        "<>": "!=",
        "endswith": ".endsWith",
        "contains": ".contains",
        "startswith": ".startsWith",
        "notcontains": ".notcontains"
    },
        dataNs = DX.data,
        utilsNs = DX.utils,
        inflectorNs = DX.inflector;

    function createJayDataQuery(queryable, queryOptions, tasks) {
        var entityContext;

        tasks = tasks || [];
        queryOptions = queryOptions || {};

        if (!window.$data)
            throw Error("JayData library is required");
        if (!(queryable instanceof $data.Queryable))
            throw Error("Invalid argument passed: queryable");

        function enumerate() {
            var d = $.Deferred().fail(handleError);

            queryable = applyTasks(tasks);
            if (queryOptions.requireTotalCount)
                queryable = queryable.withInlineCount();

            queryable.toArray()
                .then(function (data) {
                    if (queryOptions.requireTotalCount && utilsNs.isNumber(data.totalCount)) {
                        d.resolve([].concat(data), { totalCount: data.totalCount });
                    } else {
                        d.resolve(data);
                    }
                })
                .fail(d.reject);

            return d.promise();
        }

        function count() {
            var d = $.Deferred().fail(handleError),
                filteredTasks;

            filteredTasks = $.grep(tasks, function (task) {
                return !/map|order|take|skip/i.test(task.action);
            });

            queryable = applyTasks(filteredTasks);
            queryable.withInlineCount()
                .take(0)
                .toArray()
                .then(function (data) {
                    d.resolve(data.totalCount);
                })
                .fail(d.reject);

            return d.promise();
        }

        function applyTasks(tasks) {
            $.each(tasks, function () {
                queryable = queryable[this.action].apply(queryable, this.params);
            });
            return queryable;
        }

        function createDerivedQuery(actionName, params) {
            return createJayDataQuery(queryable, queryOptions, tasks.concat({
                action: actionName,
                params: params
            }));
        }

        function formatSortParam(field, desc) {
            return desc ? "-".concat(field) : field;
        }

        function handleError(error) {
            var errorHandler = queryOptions.errorHandler;
            if (errorHandler)
                errorHandler(error);
            dataNs._handleError(error);
        }

        function slice(skip, take) {
            var newTasks = [];
            if (skip)
                newTasks.push({ action: "skip", params: [skip] });
            if (take)
                newTasks.push({ action: "take", params: [take] });
            return createJayDataQuery(queryable, queryOptions, tasks.concat(newTasks));
        }

        function sortBy(field, desc) {
            return createDerivedQuery("order", [formatSortParam(field, desc)]);
        }

        function thenBy(field, desc) {
            var lastTask = tasks[tasks.length - 1];
            if (!lastTask || lastTask.action != "order")
                throw Error("Cannot be called before sortBy");
            return sortBy(field, desc);
        }

        function select(expr) {
            var fields = [];

            if (!$.isArray(expr))
                expr = $.makeArray(arguments);

            $.each(expr, function () {
                var key, value = String(this);
                key = value.indexOf(".") === -1
                        ? value
                        : inflectorNs.camelize(value.replace(/\./g, "-"));

                fields.push([key, ":", "entity.", value].join(""));
            });

            return createDerivedQuery("map", [new Function("entity", "return { " + fields.join() + "};")]);
        }

        function filter(criteria) {
            if (!$.isArray(criteria))
                criteria = $.makeArray(arguments);
            return createDerivedQuery("filter", [compileCriteria(criteria)]);
        }

        function compileCriteria(criteria) {
            return compileCore(criteria);

            function formatCriterion(operator, left, right) {
                var result,
                    shouldNegate = operator.indexOf(".not") === 0;

                if (shouldNegate)
                    operator = operator.replace("not", "");

                result = operator.charAt(0) === "."
                    ? [left, operator, "(", right, ")"].join("")
                    : [left, operator, right].join(" ");

                return shouldNegate ? "!(" + result + ")" : result;
            }

            function translateBinaryOperator(op) {
                return operatorMap[op] || op;
            }

            function compileCore(criteria) {
                return $.isArray(criteria[0])
                    ? compileGroup(criteria)
                    : compileBinary(criteria);
            }

            function compileGroup(criteria) {
                var groupOperands = [],
                    groupOperator,
                    nextGroupOperator;

                $.each(criteria, function () {
                    if ($.isArray(this)) {
                        if (groupOperands.length > 1 && nextGroupOperator !== groupOperator)
                            throw Error("Mixing of and/or is not allowed inside a single group");

                        groupOperator = nextGroupOperator;
                        groupOperands.push(compileCore(this));
                        nextGroupOperator = " && ";
                    } else {
                        nextGroupOperator = /and|&/i.test(this) ? " && " : " || ";
                    }
                });

                return groupOperands.length < 2 ? groupOperands[0] : "(" + groupOperands.join(groupOperator) + ")";
            }

            function compileBinary(criteria) {
                var left,
                    right,
                    operator;
                criteria = dataNs.utils.normalizeBinaryCriterion(criteria);

                left = "it.".concat(criteria[0]);
                right = isFinite(criteria[2]) ? criteria[2] : "'" + criteria[2] + "'";
                operator = translateBinaryOperator(criteria[1].toLowerCase());

                return formatCriterion(operator, left, right);
            }
        }

        return {
            enumerate: enumerate,
            count: count,
            slice: slice,
            sortBy: sortBy,
            thenBy: thenBy,
            filter: filter,
            select: select,
            sum: DX.abstract,
            min: DX.abstract,
            max: DX.abstract,
            avg: DX.abstract,
            groupBy: DX.abstract,
            aggregate: DX.abstract
        };
    }

    var JayDataStore = dataNs.Store.inherit({
        ctor: function (options) {
            if (!window.$data)
                throw Error("JayData library is required");

            if (options instanceof $data.Queryable)
                options = {
                    queryable: options,
                    autoCommit: false
                };

            this.callBase(options);

            this._queryable = options.queryable;
            this._autoCommit = options.autoCommit;
            this._entityType = this._queryable.defaultType;
        },

        _customLoadOptions: function () {
            return ["queryable"];
        },

        createQuery: function (loadOptions) {
            var o = loadOptions || {};
            return dataNs.queryImpl.jayData(o.queryable || this.queryable(),
                { errorHandler: this._errorHandler, requireTotalCount: o.requireTotalCount });
        },

        queryable: function () {
            return this._queryable;
        },

        entityType: function () {
            return this._entityType;
        },

        entityContext: function () {
            return this.queryable().entityContext;
        },

        key: function () {
            var key,
                keysProps = this.queryable()
                .elementType
                .memberDefinitions
                .getKeyProperties();

            if (!keysProps || !keysProps.length)
                return this._key;

            key = $.map(keysProps, function (key) {
                return key.name;
            });

            return key.length > 1 ? key : key[0];
        },

        _byKeyImpl: function (keyValue) {
            var d,
                key,
                type,
                predicate;

            var entity,
                entityType,
                trackedEntities;

            this._requireKey();

            d = $.Deferred();
            key = this.key();
            type = this.entityType();

            $.each(this.entityContext().stateManager.trackedEntities,
                $.proxy(function (_, item) {
                    if (item.data.getType() !== type)
                        return true;
                    if (this.keyOf(item.data) !== keyValue)
                        return true;
                    if ($.inArray(item.data.entityState, [$data.EntityState.Deleted, $data.EntityState.Detached]) > -1)
                        return true;

                    entity = item.data;
                    return false;
                }, this)
            );

            if (entity) d.resolve(entity);
            else {
                predicate = !utilsNs.isArray(key)
                    ? ["it.", key, "==", keyValue].join("")
                    : $.map(key, function (keyItem) {
                        return ["it.", keyItem, "==", keyValue[keyItem] || keyValue].join("")
                    }).join(" && ");
                this.queryable()
                    .filter(predicate)
                    .toArray()
                    .fail(d.reject)
                    .done(function (results) { d.resolve(results[0]); });
            }

            return d.promise();
        },

        _updateImpl: function (keyValue, values) {
            var d = $.Deferred();
            this.byKey(keyValue)
                .fail(d.reject)
                .done($.proxy(function (entity) {
                    this.queryable().attach(entity);
                    $.each(values, function (propName, propValue) {
                        entity.setProperty({ name: propName }, propValue);
                    });
                    if (!this._autoCommit)
                        d.resolve(keyValue, values);
                    else this.entityContext()
                            .saveChanges()
                            .fail(d.reject)
                            .done(function () { d.resolve(keyValue, values); });
                }, this));

            return d.promise();
        },

        _insertImpl: function (values) {
            var d = $.Deferred(),
                self = this,
                entity;

            entity = this.queryable().add(values);

            if (!this._autoCommit)
                d.resolve(values, this.keyOf(entity));
            else this.entityContext()
                    .saveChanges()
                    .fail(d.reject)
                    .done(function () { d.resolve(values, self.keyOf(entity)); });

            return d.promise();
        },

        _removeImpl: function (keyValue) {
            var d = $.Deferred();

            this.byKey(keyValue)
                .fail(d.reject)
                .done($.proxy(function (entity) {
                    this.queryable().remove(entity);
                    if (!this._autoCommit)
                        d.resolve(keyValue);
                    else this.entityContext()
                            .saveChanges()
                            .fail(d.reject)
                            .done(function () { d.resolve(keyValue); });
                }, this));

            return d.promise();
        }
    });

    dataNs.JayDataStore = JayDataStore;
    dataNs.queryImpl.jayData = createJayDataQuery;
})(jQuery, DevExpress);