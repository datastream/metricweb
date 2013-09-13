/*global Backbone */
var app = app || {};

(function () {
    'use strict';
    var Metrics = Backbone.Collection.extend({
        model: app.Metric,
    });
    app.metrics = new Metrics();
})();
