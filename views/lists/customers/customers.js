SFA.customers = function (params) {

    var dataSource = ko.observable(null);
    var searchString = ko.observable().extend({ throttle: 500 });
    searchString.subscribe(function (value) {
        if (!dataSource())
            return;

        if (value && value.length > 1)
            dataSource().filter("Name", "contains", value);
        else
            dataSource().filter(null);

        dataSource().load();
    });


    var bind = function () {
        dataSource(new DevExpress.data.DataSource({
            store: SFA.app.data.stores.CustomersStore,
            sort: ["Name"]
        }));
    };

    var onViewShowing = function (e) {
        bind();
    };

    var onViewShown = function (e) {
    };

    return {
        data: dataSource,
        search:{
            text: searchString
        },
        viewShowing: onViewShowing,
        viewShown: onViewShown,
    };
};