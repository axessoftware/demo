SFA.preferences = function (params) {
    var tabSelectedIndex = ko.observable(0);

    var deauthenticateVisible = ko.observable((SFA.app.settings.global.isConnected || false));
    var showStatisticsValue = ko.observable(SFA.app.settings.global.showSyncStatistics || false);
    var showStatistics = showStatisticsValue();

    showStatisticsValue.subscribe(function (value) {
        showStatistics = value;
    });

    var serverAddressValue = ko.observable(SFA.app.settings.global.serverAddress);
    var printers = ko.observableArray([]);
    var printer = ko.observable(SFA.app.settings.global.defaultPrinter);

    var findPrinters = function () {
        var selected = SFA.app.settings.global.defaultPrinter;
        var devices = selected ? [selected] : [];
        var detected = [];

        var exclude = $.map(devices, function (item) {
            return item.mac;
        });

        try {
            if (!window.hasOwnProperty('bluetoothSerial'))
                throw 'Bluetooth not accessible.';

            bluetoothSerial.list(function (results) {
                detected = $.map(results, function (item, index) {
                    var object = {
                        name: item.name,
                        mac: null
                    }

                    if (item.hasOwnProperty("uuid"))
                        object.mac = item.uuid;
                    else if (item.hasOwnProperty("address"))
                        object.mac = item.address;

                    if (!exclude.includes(object.mac))
                        return object;
                });

                devices.push.apply(devices, detected);
                printers(devices);
            }, function (e) {
                detected = [];
            });
        } catch (e) {
            detected = [];
            devices.push.apply(devices, detected);
        }
    };

    var onSaveClick = function (e) {
        DevExpress.ui.dialog.confirm("Doriți salvarea modificărilor?", "Axes Software SFA").done(function (dialogResult) {
            if (dialogResult) {
                SFA.app.settings.global.serverAddress = serverAddressValue();
                SFA.app.settings.global.defaultPrinter = printer();
                SFA.app.settings.global.showSyncStatistics = showStatistics;

                if ((SFA.app.settings.global.isConnected || false) == true) {
                    SFA.app.navigate("home", { root: true, target: 'current' });
                } else
                    SFA.app.back();
            }
        });
    };

    var onDeauthenticateClick = function (e) {
        SFA.app.engines.UsersEngine.logout().then(function () {
            SFA.app.navigate("login", { root: true, target: 'current' });
        }, function (e) {
            DevExpress.ui.notify(e, "warning", 1000);
        });
    };

    var onPrinterChange = function (e) {
        var item = e.selectedItem;
        if (item)
            printer(item);
    };

    var onViewShowing = function (e) {
        deauthenticateVisible((SFA.app.settings.global.isConnected || false));
        showStatisticsValue = ko.observable(SFA.app.settings.global.showSyncStatistics || false);
        printer(SFA.app.settings.global.defaultPrinter);
        findPrinters();
    };

    var onViewShown = function (e) {
    };

    return {
        handlers: {
            save: {
                click: onSaveClick
            },
            deauthenticate: {
                click: onDeauthenticateClick,
                visible: deauthenticateVisible
            }
        },
        tab: {
            selectedIndex: tabSelectedIndex
        },
        settings: {
            serverAddress: serverAddressValue,
            statistics: {
                value: showStatisticsValue
            },
            printers: {
                list: printers,
                change: onPrinterChange
            }
        },
        viewShowing: onViewShowing,
        viewShown: onViewShown
    };
};