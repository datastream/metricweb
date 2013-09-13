/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
    'use strict';
    app.MonitorView = Backbone.View.extend({
        el: '#main',

        events: {
            'keypress #search-host': 'searchHost',
            'click .metrics': 'metricsShow',
            'click #resetmetrics': 'metricsClear',
            'click #refreshmetrics': 'metricsShow',
        },

        initialize: function () {
            this.$input = this.$('#search-host');
            this.$main = this.$('#main');
            this.listenTo(app.hostmetrics, 'reset', this.hostmetricsShow);
            this.listenTo(app.metrics, 'add', this.metricsShow);
            this.listenTo(app.metrics, 'remove', this.metricsShow);
            this.render();
        },

        render: function() {
        },

        searchHost: function (e) {
            if (e.which !== ENTER_KEY || !this.$input.val().trim()) {
                return;
            }
            app.hostmetrics.url = app.hostmetrics.url_api + this.$input.val().trim() + '/metric'
            var setHeader = function (xhr) {
                xhr.setRequestHeader('Accept', 'application/json');
            };
            app.hostmetrics.fetch({ beforeSend: setHeader, reset: true});
            this.$input.val('');
        },

        oneHostMetric: function(hostmetric) {
            var view = new app.HostMetricView({ model: hostmetric });
            $('#metric_list').append(view.render().el);
        },
        hostmetricsShow: function () {
            this.$('#metric_list').html('');
            app.hostmetrics.each(this.oneHostMetric, this);
        },
        metricsClear: function () {
            app.metrics.reset();
            this.$('#graph').hide();
        },
        metricsShow: function () {
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
