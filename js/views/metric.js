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
            app.metrics.trigger('update');
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
            this.$('#chart').show();
        },
    });
})(jQuery);
