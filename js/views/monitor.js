/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
    'use strict';
    app.MonitorView = Backbone.View.extend({
        el: '#main',

        events: {
            'keypress #search-host': 'searchHost',
            'click .metrics': 'metricsShow',
        },

        initialize: function () {
            this.$input = this.$('#search-host');
            this.$main = this.$('#main');
            this.listenTo(app.hostmetrics, 'reset', this.hostmetricsShow);
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
        metricsShow: function () {
            var view = new app.MetricView();
            view.metricsGraphic()
        }
    });
})(jQuery);
