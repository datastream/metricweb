/*global Backbone */
var app = app || {};

(function () {
    'use strict';
    var Metrics = Backbone.Collection.extend({
        model: app.Metric,
        url_api: '/api/v1/metric?metrics=',
    });
    app.metrics = new Metrics();
})();
