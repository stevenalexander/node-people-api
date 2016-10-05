var express = require('express')
var path = require('path')
var logger = require('morgan')
var bodyParser = require('body-parser')

var peopleRoute = require('./routes/people')

var app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Documentation
app.use(express.static(path.join(__dirname, 'documentation')))

peopleRoute(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  })
})

module.exports = app
