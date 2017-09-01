'use strict';

// Load dependencies
const express = require('express')
const http = require('http')

const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// Init express
const app = express()

// all environments
app.set('port', 4321)
app.use(bodyParser.urlencoded({ extended: true, limit: '40mb' }))
app.use(bodyParser.json({ type: 'application/vnd.api+json', limit: '40mb' }))
app.use(methodOverride('X-HTTP-Method-Override'))

const server = http.createServer(app).listen(app.get('port'), () => {
  if (app.get('env') === 'development') {
    console.log('Started...')
  }
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.get('/', (req, res) => {
  res.json({kort: '0.0.1'});
});

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(req.status || 404).json({errors: req.errors})
})

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(req.status || 404).json({errors: req.errors})
  })
}
