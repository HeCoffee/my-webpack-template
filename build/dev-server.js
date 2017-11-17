var express = require('express');
var webpack = require('webpack');
var opn = require('opn')
var app = express();
var webpackConfig = require('./webpack.config.js');

Object.keys(webpackConfig.entry).forEach(function (name) {
  webpackConfig.entry[name] = ['./build/dev-client.js'].concat(webpackConfig.entry[name])
})

var compiler = webpack(webpackConfig);


var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})


// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

var port = 3000

var uri = 'http://localhost:' + port

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  opn(uri)
})


// Serve the files on port 3000.
app.listen(port, function () {
  console.log('Example app listening on port 3000!\n');
});
