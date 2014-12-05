window.SFA = window.SFA || {};

$(function () {
    if (window.app.info.debug == true)
        console.log('Application ' + window.app.info.name + ' started.');

    function findController(name, controllers) {
        try {
            var result = $.grep(controllers, function (item, index) {
                return item.controller.name == name;
            });

            return result.length ? result[0].controller : null;
        } catch (e)
        { return DevExpress.framework.html.layoutSets['simple']; }
    };

    function listen(evnt, elem, func) {
        if (elem.addEventListener)  // W3C DOM
            elem.addEventListener(evnt, func, false);
        else if (elem.attachEvent) { // IE DOM
            var r = elem.attachEvent("on" + evnt, func);
            return r;
        }
        else window.alert('I\'m sorry Dave, I\'m afraid I can\'t do that.');
    };

    function initialize() {
        SFA.app.data = window.app.data;
        SFA.app.data.model = model;
        SFA.app.data.context = $data.context;

        /* Initialize stores */
        SFA.app.data.stores.initialize();

        /* Initialize engines */
        window.app.engines.SyncEngine = new SyncEngine(SFA.app.info, SFA.app.data.context, SFA.app.data.scopes, SFA.app.settings.global);
        window.app.engines.UsersEngine = new UsersEngine(SFA.app.info, SFA.app.data.context, SFA.app.settings.global);

        /* Assign to application namespace */
        SFA.app.engines = window.app.engines;

        if ((SFA.app.settings.global.keepMeSignedIn || false) == true) {
            if (SFA.app.settings.global.userId)
                SFA.app.engines.UsersEngine.check(SFA.app.settings.global.userId).then(function () {
                    SFA.app.navigate("home", { root: true, target: 'current' });
                }, function (e) {
                    SFA.app.navigate("login", { root: true, target: 'current' });
                });
            else
                SFA.app.navigate("login", { root: true, target: 'current' });
        } else
            SFA.app.navigate("login", { root: true, target: 'current' });
    };

    listen("load", window, function () {
        if (window.mobilecheck() === false)
            onDeviceReady();
        else {
            document.addEventListener("deviceready", onDeviceReady, false);

            setTimeout(function () {
                if (window.app.info.debug == true)
                    console.log('Waited for deviceReady event... trigger it manually.');
                onDeviceReady();
            }, 500);
        }
    });

    function onDeviceReady() {
        if (window.app.deviceReady == true)
            return;

        window.app.deviceReady = true;

        if (window.app.info.debug == true)
            console.log('Device ready fired.');

        if (!(!navigator["splashscreen"]))
            navigator["splashscreen"].hide();

        document.addEventListener("backbutton", onBackButton, false);

        /* replace default database open function */
        if ('sqlitePlugin' in window) {
            window.openDatabase = function (fileName, version, displayName, maxSize) {
                var file = window.app.info.databasePath + fileName + ".db";

                return window.sqlitePlugin.openDatabase({ name: file });
            };

            console.log("window.openDatabase replaced with \'sqlitePlugin\' shim.");
        }

        /* Initialize application datacontext */
        $data.context = new model.ModelContext({
            name: "sqLite",
            databaseName: window.app.info.databaseName,
            dbCreation: $data.storageProviders.DbCreationType.DropTableIfChanged
        });

        $data.context.onReady().then(function () {
            $data.context.storageProvider.initializeStore();

            initialize();
        }, function (e) {
            if (window.app.info.debug == true)
                console.log(e);
        });
    };

    function onBackButton() {
        DevExpress.hardwareBackButton.fire();
    }

    function onNavigatingBack(e) {
        if (e.isHardwareButton && !SFA.app.canBack())
            e.cancel = true;
    }

    function exitApp() {
        if ((SFA.app.settings.global.keepMeSignedIn || false) == false)
            SFA.app.engines.UsersEngine.logout();

        switch (DevExpress.devices.real().platform) {
            case "tizen":
                window["tizen"].application.getCurrentApplication().exit();
                break;
            case "android":
                navigator["app"].exitApp();
                break;
            case "win8":
                window.external.Notify("DevExpress.ExitApp");
                break;
        }
    }

    var appCommands = [
       {
           id: 'preferences',
           location: 'after'
       },
       {
           id: 'sync',
           location: 'after'
       },
       {
           id: 'save',
           location: 'after'
       }
    ];

    var layoutSet = [];

    layoutSet.push.apply(layoutSet, DevExpress.framework.html.layoutSets['slideout']);
    layoutSet.push.apply(layoutSet, DevExpress.framework.html.layoutSets["simple"]);

    SFA.app = new DevExpress.framework.html.HtmlApplication({
        namespace: SFA,
        layoutSet: layoutSet,
        navigation: SFA.config.navigation,
        commandMapping: {
            "ios-header-toolbar": {
                defaults: {
                    "showText": false,
                    "showIcon": true
                },
                commands: appCommands
            },
            "android-simple-toolbar": {
                defaults: {
                    "showText": false,
                    "showIcon": true
                },
                commands: appCommands
            },
            "android-footer-toolbar": {
                defaults: {
                    "showText": false,
                    "showIcon": true
                },
                commands: appCommands
            },
            "win8-phone-appbar": {
                defaults: {
                    "showText": false,
                    "showIcon": true
                },
                commands: appCommands
            },
            "win8-appbar": {
                defaults: {
                    "showText": false,
                    "showIcon": true
                },
                commands: appCommands
            },
            "win8-toolbar": {
                defaults: {
                    "showText": false,
                    "showIcon": true
                },
                commands: appCommands
            },
            "tizen-simple-toolbar": {
                defaults: {
                    "showText": false,
                    "showIcon": true
                },
                commands: appCommands
            },
            "tizen-footer-toolbar": {
                defaults: {
                    "showText": false,
                    "showIcon": true
                },
                commands: appCommands
            },
            "generic-header-toolbar": {
                defaults: {
                    "showText": false,
                    "showIcon": true
                },
                commands: appCommands
            }
        }
    });

    /* Configure application */
    window.app.settings.global = new Settings(window.app.info.id);

    /* Assign to application namespace */
    SFA.app.info = window.app.info;
    SFA.app.settings = window.app.settings;

    /* Layout resolver */
    SFA.app.resolveLayoutController.add(function (args) {
        var viewName = args.viewInfo.viewName;

        var controller = null;
        if ((SFA.app.settings.global.isConnected || false) !== true)
            controller = findController('simple', args.availableLayoutControllers);
        else
            controller = findController('slideout', args.availableLayoutControllers);

        args.layoutController = controller;
    });

    SFA.app.router.register(":view", { view: "login" });
    SFA.app.router.register(":view", { view: "preferences" });
    SFA.app.router.register(":view", { view: "main" });
    SFA.app.router.register(":view", { view: "lists" });
    SFA.app.router.register(":view/:id", { view: "customer", id: null });
    SFA.app.router.register(":view/:id", { view: "product", id: null });

    SFA.app.navigatingBack.add(onNavigatingBack);
});
