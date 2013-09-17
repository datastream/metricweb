/*global Backbone */
var app = app || {};

(function () {
    'use strict';

    var MonitorRouter = Backbone.Router.extend({
        routes: {
            'metric/:name': 'metricsShow',
        },
        metricsShow: function(name) {
            var item = new app.Metric({name: name});
            app.metrics.add(item);
        },
    });
    app.MonitorRouter = new MonitorRouter();
    Backbone.history.start();
})();
