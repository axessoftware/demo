SFA.lists = function (params) {
    var onItemClick = function (e) {
        var item = e.itemData;
        if (!item)
            return;

        console.log(item);
    };

    return {
        sourceData: {
            data: [{ name: 'Clienți', key: 'customers', action: '#customers' }, { name: 'Produse', key: 'products', action: '#products' }],
            click: onItemClick
        }
    };
};