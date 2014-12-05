window.app = window.app || {};
window.app.info = window.app.info || {
    id: 'app-axes-sfa',
    name: 'SFA',
    company: 'Axes Software',
    version: '1.0.0.0',
    schemaVersion: null,
    debug: true,
    debugSql: false

};

window.app.info.databasePath = "/mnt/sdcard/" + window.app.info.company + "/";
window.app.info.databaseName = (window.app.info.id + '-database').replaceAll('_', '-');
window.app.info.databaseFile = window.app.info.databasePath + window.app.info.databaseName + ".db";

window.app.settings = window.app.settings || {};

window.app.data = window.app.data || {};
window.app.data.PAGE_SIZE = 60;
window.app.data.enums = window.app.data.enums || {};
window.app.data.scopes = window.app.data.scopes || {};

window.app.engines = window.app.engines || {};

window.app.deviceReady = false;
