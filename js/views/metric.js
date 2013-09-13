/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
    'use strict';
    app.MetricView = Backbone.View.extend({
        el: '#graphic',

        events: {
            'click #refreshmetrics': 'metricsShow',
            'click #resetmetrics': 'metricsClear',
        },

        initialize: function () {
            this.listenTo(app.metrics, 'add', this.metricsGraphic);
            this.listenTo(app.metrics, 'remove', this.metricsGraphic);
        },

        metricsClear: function () {
            app.metrics.reset();
            this.$('#graph').hide();
        },

        metricsGraphic: function () {
            var metric_list = '';
            app.metrics.each(function(metric) {
                if (metric_list.length > 0) {
                    metric_list += ',' + metric.get('key');
                } else {
                    metric_list = metric.get('key');
                }
            });
            if (metric_list.length > 0) {
                this.$('#graph').show();
                d3.json('/api/v1/metric?metrics=' + metric_list, function(data) {
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
                        d3.select('#graph svg').datum(data)
                            .transition().duration(500).call(chart);

                        nv.utils.windowResize(chart.update);
                        return chart;
                    });
                });
            } else {
                this.$('#graph').hide();
            };
        },
    });
})(jQuery);