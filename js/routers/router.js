/*global Backbone */
var app = app || {};

(function () {
    'use strict';

    var MonitorRouter = Backbone.Router.extend({
        routes: {
            'metricsgraphic/:name': 'toggleMetric',
        },
        toggleMetric: function(name) {
            var items = app.hostmetrics.where({metric:name});
            if (items.length > 0) {
                items[0].save({
                    patch: true,
                    state: !items[0].get('state')
                });
            }
            var metric_list = '';
            items = app.hostmetrics.where({state: true})
            for (var i = 0; i < items.length; i++) {
                if (metric_list.length > 0) {
                    metric_list += ',' + items[i].get('metric');
                } else {
                    metric_list = items[i].get('metric');
                }
            }
            if (metric_list.length > 0) {
                app.metrics.url = app.metrics.url_api + metric_list;
                var setHeader = function (xhr) {
                    xhr.setRequestHeader('Accept', 'application/json');
                };
                app.metrics.fetch({ beforeSend: setHeader, reset: true});
            }
        },
    });
    app.MonitorRouter = new MonitorRouter();
    Backbone.history.start();
})();
