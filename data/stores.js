window.app.data.stores = new (function () {
    var _self = this;

    this.CustomerCategoriesStore = null;
    this.CustomerSubCategoriesStore = null;
    this.CustomersStore = null;

    this.ProductCategoriesStore = null;
    this.ProductSubCategoriesStore = null;
    this.ProductsStore = null

    this.initialize = function () {
        _self.CustomerCategoriesStore = new DevExpress.data.JayDataStore({
            queryable: $data.context.CustomerCategories.filter(function (it) { return it._isDeleted == false && it.IsSubCategory == false }),
            autoCommit: true
        });

        _self.CustomerSubCategoriesStore = new DevExpress.data.JayDataStore({
            queryable: $data.context.CustomerCategories.filter(function (it) { return it._isDeleted == false && it.IsSubCategory == true }),
            autoCommit: true
        });

        _self.CustomersStore = new DevExpress.data.JayDataStore({
            queryable: $data.context.Customers.filter(function (it) { return it._isDeleted == false }),
            autoCommit: true
        });

        _self.ProductCategoriesStore = new DevExpress.data.JayDataStore({
            queryable: $data.context.ProductsCategories.filter(function (it) { return it._isDeleted == false && it.IsSubCategory == false }),
            autoCommit: true
        });

        _self.ProductSubCategoriesStore = new DevExpress.data.JayDataStore({
            queryable: $data.context.ProductsCategories.filter(function (it) { return it._isDeleted == false && it.IsSubCategory == false }),
            autoCommit: true
        });

        _self.ProductsStore = new DevExpress.data.JayDataStore({
            queryable: $data.context.Products.filter(function (it) { return it._isDeleted == false }),
            autoCommit: true
        });
    };
})();