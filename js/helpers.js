window.helpers = window.helpers || {};
window.helpers.persistence = {
    read: function (key) {
        if (!key)
            throw 'No valid key passed as parameter.';

        value = localStorage.getItem(key);
        if (!value)
            return value;

        value = $.base64.decode(value);

        try { value = JSON.parse(value); }
        catch (e) { return value; }

        return value;
    },
    write: function (key, value) {
        if (!key)
            throw 'No valid key passed as parameter.';

        if (!value)
            return;

        if (typeof value === 'object') {
            value = $.base64.encode(JSON.stringify(value));
            localStorage.setItem(key, value);
        }
        else
            localStorage.setItem(key, $.base64.encode(value));
    },
    delete: function (key) {
        if (!key)
            throw 'No valid key passed as parameter.';

        localStorage.removeItem(key);
    }
};