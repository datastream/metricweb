#global Backbone, jQuery, _, ENTER_KEY 
app = app or {}
(($) ->
  "use strict"
  app.HostMetricView = Backbone.View.extend(
    tagName: "li"
    template: _.template($("#hostmetric-template").html())
    initialize: ->
      $(".search-query").quicksearch "ul li"

    render: ->
      @$el.html @template(@model.toJSON())
      this
  )
) jQuery
