// Generated by CoffeeScript 1.6.3
(function() {
  var app;

  app = app || {};

  (function() {
    "use strict";
    var HostMetrics;
    HostMetrics = Backbone.Collection.extend({
      model: app.HostMetric,
      url_api: "/api/v1/host/"
    });
    return app.hostmetrics = new HostMetrics();
  })();

}).call(this);
