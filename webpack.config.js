const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')

const ENV = process.env.NODE_ENV
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
}

process.env.BABEL_ENV = ENV
console.log("ENV", ENV)
console.log("HOST", process.env.HOST)
console.log("PORT", process.env.PORT)
const common = {
  entry: PATHS.app,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: 'style!css!less',
        include: PATHS.app
      }, {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.app
      }
    ]
  }
}

if(ENV === 'develop' || !ENV) {
  module.exports = merge(common, {
    entry: ['webpack-hot-middleware/client', PATHS.app],
    devtool: 'eval-source-map',
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    devServer: {
      contentBase: PATHS.build,

      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      stats: 'errors-only',

      // parse host and port from env so this is easy to customize
      host: process.env.HOST,
      port: process.env.PORT
    }
  })
}

if(ENV === 'production') {
  module.exports = merge(common, {})
}
  // entry: [
  //   'eventsource-polyfill', // necessary for hot reloading with IE
  //   'webpack-hot-middleware/client',
  // ],