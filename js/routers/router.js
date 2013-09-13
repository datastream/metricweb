/*global Backbone */
var app = app || {};

(function () {
    'use strict';

    var MonitorRouter = Backbone.Router.extend({
        routes: {
            'metricsgraphic/:name': 'toggleMetric',
        },
        toggleMetric: function(name) {
            items = app.hostmetrics.where({metric:name});
            if (items.length > 0) {
                items[0].save({
                    hidden: !this.get('hidden')
                });
            }
            var metric_list = '';
            app.hostmetrics.where({hidden: false}).each(function(metric) {
                if (metric_list.length > 0) {
                    metric_list += ',' + metric.get('metric');
                } else {
                    metric_list = metric.get('metric');
                }
            });
            app.metrics.url = app.metrics.url_api + metric_list
            var setHeader = function (xhr) {
                xhr.setRequestHeader('Accept', 'application/json');
            };
            app.metrics.fetch({ beforeSend: setHeader, reset: true});
        },
    });
    app.MonitorRouter = new MonitorRouter();
    Backbone.history.start();
})();
