/*global Backbone */
var app = app || {};

(function () {
    'use strict';

    app.HostMetric = Backbone.Model.extend({
        default: {
            state: false,
            ttl: 3600,
        },
    });
})();
