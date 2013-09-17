/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
    'use strict';
    app.MonitorView = Backbone.View.extend({
        el: '#monitorapp',

        events: {
            'keypress #search-host': 'searchHost',
            'click #refreshmetrics': 'freshChart',
            'click #resetmetrics': 'clearChart',
        },

        initialize: function () {
            this.$input = this.$('#search-host');
            this.$main = this.$('#main');
            this.listenTo(app.hostmetrics, 'reset', this.hostmetricsShow);
            this.listenTo(app.metrics, 'delete', this.metricsChart);
            this.listenTo(app.metrics, 'update', this.metricsChart);
            this.listenTo(app.metrics, 'add', this.metricsChart);
            this.render();
        },

        render: function() {
        },

        searchHost: function (e) {
            if (e.which !== ENTER_KEY || !this.$input.val().trim()) {
                return;
            }
            if (app.hostmetrics.url == null) {
                app.hostmetrics.url = app.hostmetrics.url_api + this.$input.val().trim() + '/metric'
            }
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
        metricsChart: function() {
            var metric_list = '';
            app.metrics.each(function(item) {
                if (metric_list.length > 0) {
                    metric_list += ',' + item.get('name');
                } else {
                    metric_list = item.get('name');
                }
            });
            if (metric_list.length > 0) {
                this.$('#chart').show();
                d3.json(app.metrics.url_api + metric_list, function(data) {
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
                        d3.select('#chart svg').datum(data.metrics)
                            .transition().duration(500).call(chart);
                        nv.utils.windowResize(chart.update);
                        return chart;
                    });
                });
             }
        },
        clearChart: function () {
            app.metrics.reset();
            this.$('#chart').hide();
        },
        freshChart: function () {
            app.metrics.trigger('update');
        },
    });
})(jQuery);
