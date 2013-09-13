/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
    'use strict';
    app.MetricView = Backbone.View.extend({
        el: '#metricgraphic',

        events: {
            'click #refreshmetrics': 'freshChart',
            'click #resetmetrics': 'clearChart',
        },

        clearChart: function () {
            app.metrics.reset();
            this.$('#chart').hide();
        },
        freshChart: function () {
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
        metricsChart: function () {
            nv.addGraph(function() {
                var chart = nv.models.lineChart()
                    .x(function(d) { return d[0] })
                    .y(function(d) { return d[1] })
                    .color(d3.scale.category10().range());

                chart.xAxis.tickFormat(function(d) {
                    return d3.time.format('%m/%d %H:%M')(new Date(d*1000))
                });

                chart.yAxis.tickFormat(function(d) {
                    return  d3.format(',.2f')(d)
                });
                d3.select('#chart svg').datum(app.metrics.toJSON())
                    .transition().duration(500).call(chart);

                nv.utils.windowResize(chart.update);
                return chart;
            });
        },
    });
})(jQuery);
