#global Backbone, jQuery, _, ENTER_KEY 
app = app or {}
(($) ->
  "use strict"
  app.MonitorView = Backbone.View.extend(
    el: "#monitorapp"
    events:
      "keypress #search-host": "searchHost"
      "click #refreshmetrics": "freshChart"
      "click #resetmetrics": "clearChart"

    initialize: ->
      @$input = @$("#search-host")
      @$main = @$("#main")
      @listenTo app.hostmetrics, "reset", @hostmetricsShow
      @listenTo app.metrics, "delete", @metricsChart
      @listenTo app.metrics, "update", @metricsChart
      @listenTo app.metrics, "add", @metricsChart
      @render()

    render: ->
      app.metrics.fetch reset: true
      app.metrics.trigger "update"  if app.metrics.length > 0

    searchHost: (e) ->
      return  if e.which isnt ENTER_KEY or not @$input.val().trim()
      app.hostmetrics.url = app.hostmetrics.url_api + @$input.val().trim() + "/metric"
      setHeader = (xhr) ->
        xhr.setRequestHeader "Accept", "application/json"

      app.hostmetrics.fetch
        beforeSend: setHeader
        reset: true

      @$input.val ""

    oneHostMetric: (hostmetric) ->
      view = new app.HostMetricView(model: hostmetric)
      $("#metric_list").append view.render().el

    hostmetricsShow: ->
      @$("#metric_list").html ""
      app.hostmetrics.each @oneHostMetric, this

    metricsChart: ->
      metric_list = ""
      app.metrics.each (item) ->
        if metric_list.length > 0
          metric_list += "," + item.get("name")
        else
          metric_list = item.get("name")

      if metric_list.length > 0
        @$("#chart").show()
        d3.json app.metrics.url_api + metric_list, (data) ->
          nv.addGraph ->
            chart = nv.models.lineChart().x((d) ->
              d[0]
            ).y((d) ->
              d[1]
            ).color(d3.scale.category10().range())
            chart.xAxis.tickFormat (d) ->
              d3.time.format("%m/%d %H:%M") new Date(d * 1000)

            d = []
            _.each data.metrics, (element, index, list) ->
              d.push
                key: element.name
                values: element.values


            chart.yAxis.tickFormat (d) ->
              d3.format(",.2f") d

            d3.select("#chart svg").datum(d).transition().duration(500).call chart
            nv.utils.windowResize chart.update
            chart



    clearChart: ->
      model = undefined
      model.destroy()  while model = app.metrics.first()
      app.metrics.reset()
      @$("#chart").hide()

    freshChart: ->
      app.metrics.trigger "update"
  )
) jQuery
