#global Backbone 
app = app or {}
(->
  "use strict"
  HostMetrics = Backbone.Collection.extend(
    model: app.HostMetric
    url_api: "/api/v1/host/"
  )
  app.hostmetrics = new HostMetrics()
)()
