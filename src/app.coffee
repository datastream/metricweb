#global $ 

#jshint unused:false 
app = app or {}
ENTER_KEY = 13
$ ->
  "use strict"
  
  # kick things off by creating the `App`
  new app.MonitorView()

