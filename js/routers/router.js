/*global Backbone */
var app = app || {};

(function () {
    'use strict';

    var MonitorRouter = Backbone.Router.extend({
        routes: {
            'graphic': 'showGraphic',
        },
        showGraphic: function() {
            app.MonitorView.metricsShow();
        },
    });

    app.MonitorRouter = new MonitorRouter();
    Backbone.history.start();
})();
