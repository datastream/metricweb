/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
    'use strict';
    app.MonitorView = Backbone.View.extend({
        el: '#monitorapp',

        events: {
            'keypress #search-host': 'searchHost',
        },

        initialize: function () {
            this.$input = this.$('#search-host');
            this.$main = this.$('#main');
            this.listenTo(app.hostmetrics, 'reset', this.hostmetricsShow);
            this.listenTo(app.metrics, 'reset', this.metricsShow);
            this.listenTo(app.metrics, 'update', this.metricsFresh);
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
        metricsShow: function() {
            var view = new app.MetricView();
            view.metricsChart();
        },
        metricsFresh: function() {
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
})(jQuery);
