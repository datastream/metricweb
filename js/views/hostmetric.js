/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
    'use strict';
    app.HostMetricView = Backbone.View.extend({
        tagName:  'li',
        template: _.template($('#hostmetric-template').html()),
        events: {
            'click .toggle': 'toggleMetric',
        },
        initialize: function () {
            $('.search-query').quicksearch('ul li');
            this.listenTo(app.metrics, 'add', this.metricsShow);
            this.listenTo(app.metrics, 'remove', this.metricsShow);
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        toggleMetric: function() {
            var items = app.metrics.where({metric: this.model.get("metric")})
            if (items.length != 0) {
                app.metrics.remove(items)
            } else {
                app.metrics.add(this.model)
            }
        },
        metricsShow: function() {
            var view = app.MetricView();
            $('#metricgraphic').html('');
            view.metricsGraphic();
        },
    });
})(jQuery);
