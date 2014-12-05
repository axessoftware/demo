function SyncFormatter() {
    var _self = this;

    // Flag to indicate whether there is more change
    this.moreChangesAvailable = false;

    this.url = null;

    // Server blob
    this.serverBlob = null;

    this.serverId = null;

    this.deviceId = null;

    // List of updated entities
    this.results = new Array();

    // Deserialize payload to entity
    this.parse = function (string) {
        var deferred = new $.Deferred();

        try {
            var data = JSON.parse(string);

            var moreChangesAvailable = data.d.__sync.moreChangesAvailable;
            var serverBlob = data.d.__sync.serverBlob;
            var results = data.d.results;

            deferred.resolve({ moreChangesAvailable: moreChangesAvailable, serverBlob: serverBlob, results: results });
        } catch (e)
        { deferred.reject(e); }

        return deferred.promise();
    };

    // Serialize entity to payload object
    this.dataObject = function () {
        var data = new Object();

        data.d = new Object();
        data.d.__sync = new Object();
        data.d.__sync.moreChangesAvailable = this.moreChangesAvailable;
        data.d.__sync.serverBlob = this.serverBlob;
        data.d.results = this.results;

        return data;
    };

    // Serialize payload object to its wire format
    this.toString = function () {
        return JSON.stringify(this.dataObject());
    };

    // Send request to sync service
    this.sendRequest = function () {
        var deferred = new $.Deferred();

        try {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("POST", _self.url);
            xmlHttp.setRequestHeader("Accept", "application/json");
            xmlHttp.setRequestHeader("Content-Type", "application/json");

            if (!(!_self.deviceId))
                xmlHttp.setRequestHeader("Device-ID", _self.deviceId);

            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4) {
                    if (xmlHttp.status == 200) {
                        var server = this.getResponseHeader('Pragma');
                        if (_self.serverId && server == _self.serverId) {
                            deferred.reject('Could not pair with another server.');
                            return;
                        }

                        _self.parse(xmlHttp.responseText).then(function (response) {
                            deferred.resolve(response, server);
                        }, function (e) {
                            deferred.reject(e);
                        });
                        return;
                    }

                    if (xmlHttp.responseText === "")
                        deferred.reject('There was a problem communicating with the server. Please check server address.');
                    else {
                        var e = null;

                        var object = null;
                        try {
                            object = JSON.parse(xmlHttp.responseText);
                            if (object) {
                                var startDelimiter = '\u000d\u000a'
                                var endDelimiter = '   at '
                                var sIndex = object.ErrorDescription.indexOf(startDelimiter) + 2;
                                var eIndex = object.ErrorDescription.indexOf(endDelimiter);
                                e = object.ErrorDescription.substring(sIndex, eIndex);
                            } else
                                e = xmlHttp.responseText;
                        }
                        catch (e)
                        { object = undefined; }

                        deferred.reject(e);
                    }
                }
            };

            xmlHttp.send(this.toString());
        } catch (e)
        { deferred.reject('There was a problem communicating with the server. Please check server address.'); }

        return deferred.promise();
    };
}