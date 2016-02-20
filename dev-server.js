var express = require('express')
var webpack = require('webpack')

var webpackDevMiddleware = require("webpack-dev-middleware")
var webpackHotMiddleware = require("webpack-hot-middleware")
var webpackConfig = require('./webpack.config')

var app = express()

var compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler))
app.use(webpackHotMiddleware(compiler))
app.use(express.static(__dirname))
app.use(express.static('app'))

app.listen(3000)