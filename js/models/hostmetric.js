/*global Backbone */
var app = app || {};

(function () {
    'use strict';

    app.HostMetric = Backbone.Model.extend({
        default: {
            hidden: true,
        },
    });
})();
