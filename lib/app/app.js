var appBase = function () { };
app = {
    namespace: function (parent, name, obj) {
        if (typeof (parent[name]) == 'undefined') {
            parent[name] = typeof(obj) != 'undefined' ? obj : {};
        }
    },
    validation: {},
    ui: {}
};
appBase.prototype = app;
