/*global Backbone */
var app = app || {};

(function () {
    'use strict';

    var MonitorRouter = Backbone.Router.extend({
        routes: {
            'metric/:name': 'toggleMetric',
        },
        toggleMetric: function(name) {
            var items = app.hostmetrics.where({metric_name:name});
            app.hostmetrics.remove(items);
            if (items.length > 0) {
                items[0].set({state: !items[0].get('state')});
                app.hostmetrics.add(items[0]);
            }
            app.metrics.trigger('update');
        },
    });
    app.MonitorRouter = new MonitorRouter();
    Backbone.history.start();
})();
