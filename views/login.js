SFA.login = function (params) {

    var hidden = false;
    var busy = ko.observable(false);

    var authenticationProgressVisible = ko.observable(false);
    var syncProgressVisible = ko.observable(false);

    var preferencesDisabled = ko.observable(false);
    var syncDisabled = ko.observable(!SFA.app.settings.global.serverAddress);
    var authenticateDisabled = ko.observable(false);

    var usernameValue = ko.observable(SFA.app.settings.global.username || "");
    var passwordValue = ko.observable(SFA.app.settings.global.password || "");
    var keepMeSignedInValue = ko.observable(SFA.app.settings.global.keepMeSignedIn || false);

    keepMeSignedInValue.subscribe(function (value) {
        if (value !== SFA.app.settings.global.keepMeSignedIn)
            SFA.app.settings.global.keepMeSignedIn = value;
    });

    var popupText = ko.observable(null);
    var popupTitle = ko.observable(null);

    var onPreferencesClick = function (e) {
        hidden = true;

        SFA.app.navigate('preferences');
    };

    var onSyncClick = function (e) {
        if (!SFA.app.settings.global.serverAddress)
            return;

        popupText(null);
        busy(true);
        syncProgressVisible(true);

        SFA.app.engines.SyncEngine.sync('UsersScope', null).then(function (statistics) {
            syncProgressVisible(false);
            busy(false);

            if ((SFA.app.settings.global.showSyncStatistics || false) == true)
                DevExpress.ui.dialog.confirm("Doriți să vedeți statisticile sincronizarii?", "Axes Software SFA").done(function (dialogResult) {
                    if (dialogResult) {
                        var end = statistics.syncEnd.getTime();
                        var start = statistics.syncStart.getTime();

                        var diff = end - start;

                        var now = new Date();
                        var duration = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
                        duration.setMilliseconds(diff);

                        var text = "Descărcări: " + statistics.downloaded + "\r\n" +
                                   "Încărcări: " + statistics.uploaded + "\r\n" +
                                   "Durată: " + duration.format('hh:mm:ss');

                        popupTitle("Statistici sincronizare");
                        popupText(text);
                        showPopup();
                    }
                });
        }, function (e) {
            syncProgressVisible(false);
            busy(false);

            DevExpress.ui.dialog.confirm("Au fost întâmpinate probleme la sincronizare.\r\nDoriți să vedeți desfășurătorul?", "Axes Software SFA").done(function (dialogResult) {
                if (dialogResult) {
                    popupTitle("Probleme sincronizare");
                    popupText(e.toString());
                    showPopup();
                }
            });
        });
    };

    var onAuthenticateClick = function (e) {
        if (usernameValue() === "") {
            $("#username").dxTextBox("instance").focus();
            return;
        }
        else if (passwordValue() === "") {
            $("#password").dxTextBox("instance").focus();
            return;
        }

        busy(true);
        authenticationProgressVisible(true);

        SFA.app.engines.UsersEngine.login(usernameValue(), passwordValue()).then(function () {
            busy(false);
            authenticationProgressVisible(false);

            SFA.app.navigate("home", { root: true, target: 'current' });
        }, function (e) {
            busy(false);
            authenticationProgressVisible(false);

            DevExpress.ui.notify(e, "warning", 1000);
        });
    };

    var onUsernameFieldKeyPress = function (source, event) {
        $("#password").dxTextBox("instance").focus();
    };

    var onPasswordFieldKeyPress = function (source, event) {
        $("#btnAuthenticate").click();
    };

    var onViewShowing = function (e) {
        syncDisabled(!SFA.app.settings.global.serverAddress);
    };

    var onViewShown = function (e) {
        if (usernameValue() === "")
            $("#username").dxTextBox("instance").focus();
        else if (passwordValue() === "")
            $("#password").dxTextBox("instance").focus();

        hidden = false;
        setTimeout(function () {
            if (hidden == true)
                return;

            if (!SFA.app.settings.global.serverAddress)
                DevExpress.ui.dialog.confirm("Adresa serverului nu este setată.\r\nDoriți să o setați acum?", "Axes Software SFA").done(function (dialogResult) {
                    if (dialogResult)
                        onPreferencesClick();
                });
            else if (SFA.app.engines.SyncEngine.isInitialSync('UsersScope') == true)
                DevExpress.ui.dialog.confirm("Doriți să efectuați o sincronizare inițială?", "Axes Software SFA").done(function (dialogResult) {
                    if (dialogResult)
                        onSyncClick();
                });
        }, 1000);
    };

    var onViewHidden = function (e) {
        hidden = true;
    };

    var showPopup = function () {
        $("#popup").data("dxPopup").show();
    };

    var hidePopup = function () {
        $("#popup").data("dxPopup").hide();
    };

    return {
        handlers: {
            preferences: {
                click: onPreferencesClick,
                disabled: preferencesDisabled
            },
            sync: {
                click: onSyncClick,
                disabled: syncDisabled
            },
            authenticate: {
                click: onAuthenticateClick,
                disabled: authenticateDisabled
            }
        },
        fields: {
            username: {
                value: usernameValue,
                onEnterKeyPress: onUsernameFieldKeyPress
            },
            password: {
                value: passwordValue,
                onEnterKeyPress: onPasswordFieldKeyPress
            },
            keepMeSignedIn: {
                value: keepMeSignedInValue
            }
        },
        progress: {
            authentication: {
                visible: authenticationProgressVisible
            },
            sync: {
                visible: syncProgressVisible
            }
        },
        popup: {
            show: showPopup,
            hide: hidePopup,
            text: popupText,
            title: popupTitle
        },
        viewShowing: onViewShowing,
        viewShown: onViewShown,
        viewHidden: onViewHidden
    };
};