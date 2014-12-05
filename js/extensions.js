String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
}

String.prototype.startsWith = function (str) {
    return this.indexOf(str) == 0;
};

String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

String.prototype.toStringOrEmpty = function () {
    return !this ? '' : this.toString();
};

String.prototype.compare = function (that, caseInsensitive) {
    if (caseInsensitive)
        return this.toString().toLowerCase() === that.toString().toLowerCase();

    return this.toString() === that.toString();
};

String.prototype.replaceAll = function (str1, str2, ignore) {
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
};

String.prototype.contains = function () {
    return String.prototype.indexOf.apply(this, arguments) !== -1;
};

String.prototype.isEmpty = function () {
    if (this.length > 1)
        return this.replaceAll(" ", "").length == 0;
    else
        return this.length == "";
};

var STR_PAD_LEFT = 1;
var STR_PAD_RIGHT = 2;
var STR_PAD_BOTH = 3;

String.prototype.pad = function pad(len, pad, dir) {
    var str = this || "";

    if (typeof (len) == "undefined") { var len = 0; }
    if (typeof (pad) == "undefined") { var pad = ' '; }
    if (typeof (dir) == "undefined") { var dir = STR_PAD_RIGHT; }

    if (len + 1 >= str.length) {
        switch (dir) {
            case STR_PAD_LEFT:
                str = Array(len + 1 - str.length).join(pad) + str;
                break;

            case STR_PAD_BOTH:
                var right = Math.ceil((padlen = len - str.length) / 2);
                var left = padlen - right;
                str = Array(left + 1).join(pad) + str + Array(right + 1).join(pad);
                break;

            default:
                str = str + Array(len + 1 - str.length).join(pad);
                break;
        }
    }

    return str;
};

String.prototype.capitalize = function (lc, all) {
    if (typeof (lc) == 'undefined' || lc == null)
        lc = true;

    if (typeof (all) == 'undefined' || all == null)
        all = true

    if (all) {
        return this.split(" ").map(function (currentValue, index, array) {
            return currentValue.capitalize(lc);
        }, this).join(" ").split("-").map(function (currentValue, index, array) {
            return currentValue.capitalize(false);
        }, this).join("-");
    }
    else {
        return lc ? this.charAt(0).toUpperCase() + this.slice(1).toLowerCase() : this.charAt(0).toUpperCase() + this.slice(1);
    }
};

window.mobilecheck = function () {
    var check = false;
    (function (a, b) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "h+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    }

    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
          RegExp.$1.length == 1 ? o[k] :
            ("00" + o[k]).substr(("" + o[k]).length));
    return format;
};

Date.prototype.getTodayInterval = function () {
    var date = this;
    var StartDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    var EndDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 59);

    return [StartDate, EndDate];
};

Date.prototype.getWeekInterval = function (start) {
    //Calcing the starting point
    start = start || 0;
    var today = new Date(this.setHours(0, 0, 0, 0));
    var day = today.getDay() - start;
    var date = today.getDate() - day;

    var StartDate = new Date(today.setDate(date));
    var EndDate = new Date(today.setDate(date + 6));

    return [StartDate, EndDate];
};

Date.prototype.getMonthInterval = function () {
    var date = this;
    var StartDate = new Date(date.getFullYear(), date.getMonth(), 1);
    var EndDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    return [StartDate, EndDate];
};

Date.prototype.getLastNMonthsInterval = function (months, includeThisMonth) {
    months = months || 6;
    includeThisMonth || false;

    var date = this;

    var StartDate = undefined;
    var EndDate = undefined;

    if (includeThisMonth == true) {
        var interval = date.getMonthInterval();

        StartDate = new Date(interval[0].getFullYear(), interval[0].getMonth() - months, interval[0].getDate(), 0, 0, 0, 0);
        EndDate = new Date(interval[1].getFullYear(), interval[1].getMonth(), interval[1].getDate(), 23, 59, 59, 59);
    } else {
        StartDate = new Date(date.getFullYear(), date.getMonth() - months, date.getDate(), 0, 0, 0, 0);
        EndDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 59);
    }

    return [StartDate, EndDate];
};

Date.prototype.convertUTCDateToLocalDate = function () {
    var date = this;
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
}

Object.copyProperties = function (target, source) {
    var _self = target;
    if (!source)
        source = {};

    var proxy = {};

    var sourceType = null;
    var targetType = null;
    var value = null;
    for (var property in _self) {
        if (!source.hasOwnProperty(property))
            continue;

        sourceType = proxy.toString.call(source[property]);// '[object Function]';
        targetType = proxy.toString.call(_self[property]);

        if (sourceType === '[object Function]')
            value = source[property]();
        else
            value = source[property];

        if (targetType === '[object Function]')
            _self[property](value);
        else
            _self[property] = value;
    };
};

Function.prototype.copyProperties = function (source) {
    Object.copyProperties(this, source);
};

Object.keys = Object.keys || function (obj) {
    var keys = [];
    for (var key in obj) {
        keys.push(key);
    }
    return keys;
};

GUID = new (function () {
    var s4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    var create = function () {
        return (s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4());
    }

    this.newGuid = function () {
        return create();
    }
})();

if (jQuery.when.all === undefined) {
    jQuery.when.all = function (deferreds) {
        var deferred = new jQuery.Deferred();
        $.when.apply(jQuery, deferreds).then(
            function () {
                deferred.resolve(Array.prototype.slice.call(arguments));
            },
            function () {
                deferred.fail(Array.prototype.slice.call(arguments));
            });

        return deferred;
    }
}

if (!Array.prototype.filter) {
    Array.prototype.filter = function (fun /*, thisp*/) {
        var len = this.length >>> 0;
        if (typeof fun != "function")
            throw new TypeError();

        var res = [];
        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in this) {
                var val = this[i]; // in case fun mutates this
                if (fun.call(thisp, val, i, this))
                    res.push(val);
            }
        }
        return res;
    };
}

if (!Array.prototype.includes) {
    Array.prototype.includes = function (searchElement /*, fromIndex*/) {
        if (this === undefined || this === null) {
            throw new TypeError('Cannot convert this value to object');
        }
        var O = Object(this);
        var len = parseInt(O.length) || 0;
        if (len === 0) {
            return false;
        }
        var n = parseInt(arguments[1]) || 0;
        var k;
        if (n >= 0) {
            k = n;
        } else {
            k = len + n;
            if (k < 0) k = 0;
        }
        while (k < len) {
            var currentElement = O[k];
            if (searchElement === currentElement ||
               (searchElement !== searchElement && currentElement !== currentElement)) {
                return true;
            }
            k++;
        }
        return false;
    }
}

if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
        if (this == null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };
}