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
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        toggleMetric: function() {
            app.hostmetrics.remove(this.model);
            this.model.set({state: !this.model.get('state')});
            app.hostmetrics.add(this.model);
            app.metrics.trigger('update');
        },
    });
})(jQuery);
