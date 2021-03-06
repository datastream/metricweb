#global Backbone 
app = app or {}
(->
  "use strict"
  Metrics = Backbone.Collection.extend(
    model: app.Metric
    url_api: "/api/v1/metric?metrics="
    localStorage: new Backbone.LocalStorage("metrics-backbone")
  )
  app.metrics = new Metrics()
)()
