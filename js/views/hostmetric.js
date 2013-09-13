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
            app.hostmetric.remove(this.model);
            this.model.set({state: !items[0].get('state')});
            app.hostmetric.add(this.model);
            app.metrics.trigger('update');
        },
    });
})(jQuery);
