SFA.home = function (params) {
    var lastSyncDateValue = ko.observable(SFA.app.settings.global.lastSyncDate ? new Date(SFA.app.settings.global.lastSyncDate) : null);

    var onViewShowing = function (e) {
        lastSyncDateValue(SFA.app.settings.global.lastSyncDate ? new Date(SFA.app.settings.global.lastSyncDate) : null);
    };

    var onViewShown = function (e) {

    };

    return {
        sync: {
            lastDate: lastSyncDateValue
        },
        viewShowing: onViewShowing,
        viewShown: onViewShown
    };
};