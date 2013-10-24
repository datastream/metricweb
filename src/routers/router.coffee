#global Backbone 
app = app or {}
(->
  "use strict"
  MonitorRouter = Backbone.Router.extend(
    routes:
      "metric/:name": "metricsShow"

    metricsShow: (name) ->
      item = new app.Metric(name: name)
      app.metrics.add item
      item.save()
  )
  app.MonitorRouter = new MonitorRouter()
  Backbone.history.start()
)()
