/*global Backbone */
var app = app || {};

(function () {
    'use strict';

    var MonitorRouter = Backbone.Router.extend({
        routes: {
            'metricsgraphic': 'showMetrics',
        },
        showMetrics: function() {
        },
    });
    app.MonitorRouter = new MonitorRouter();
    Backbone.history.start();
})();
