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
            var metric_list = '';
            items = app.hostmetrics.where({state: true})
            for (var i = 0; i < items.length; i++) {
                if (metric_list.length > 0) {
                    metric_list += ',' + items[i].get('metric_name');
                } else {
                    metric_list = items[i].get('metric_name');
                }
            }
            if (metric_list.length > 0) {
                app.metrics.url = app.metrics.url_api + metric_list;
                var setHeader = function (xhr) {
                    xhr.setRequestHeader('Accept', 'application/json');
                };
                app.metrics.fetch({ beforeSend: setHeader, reset: true});
            } else {
                $('#chart').hide();
            }
        },
    });
    app.MonitorRouter = new MonitorRouter();
    Backbone.history.start();
})();
