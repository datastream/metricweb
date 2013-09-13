/*global Backbone */
var app = app || {};

(function () {
    'use strict';

    var MonitorRouter = Backbone.Router.extend({
        routes: {
            'metric/:name': 'metricsShow',
        },
        metricsShow: function() {
            app.metrics.trigger('update');
        },
    });
    app.MonitorRouter = new MonitorRouter();
    Backbone.history.start();
})();
