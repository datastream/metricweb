/*global Backbone */
var app = app || {};

(function () {
    'use strict';

    var HostMetrics = Backbone.Collection.extend({
        model: app.HostMetric,
        url_api: '/api/v1/host/',
        localStorage: new Backbone.LocalStorage('todos-backbone'),
    });
    app.hostmetrics = new HostMetrics();
})();
