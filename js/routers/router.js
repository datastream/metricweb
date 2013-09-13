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
            if (items.length > 0) {
                app.hostmetrics.url = app.hostmetrics.url_api + items[0].get('host_name') + '/metric/' + items[0].get('metric_name');
                items[0].save({state: !items[0].get('state')}, {patch: true});
            }
            app.metrics.tigger('update');
        },
    });
    app.MonitorRouter = new MonitorRouter();
    Backbone.history.start();
})();
