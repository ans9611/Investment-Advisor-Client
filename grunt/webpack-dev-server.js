const webpack = require('webpack')
const clone = require('clone')

// clone the webpack config to separate configuration of webpack and dev server
const webpackConfig = clone(require('./webpack').options)

// Path module provides utilities for working with file and directory path
const path = require('path')

// Opens a new browser tab when Webpack loads, will be used in
// WebpackOnBuildPlugin callback
const opn = require('opn')

// allows `opn` to only open the browser on the first build
let firstBuild = true

// port for development server
const port = 7165

// Set the mode to development (default is 'production')
webpackConfig.mode = 'development'

// make `jQuery` and `$` available in the development console
webpackConfig.module.rules.push({
  test: require.resolve('jquery'),
  use: [{
    loader: 'expose-loader',
    options: {
      exposes: {
        globalName: 'jQuery',
        override: true
      }
    }
  }, {
    loader: 'expose-loader',
    options: {
      exposes: {
        globalName: '$',
        override: true
      }
    }
  }]
})

module.exports = {
  options: {
    port,
    inline: true, // reload on change
    webpack: webpackConfig,
    publicPath: '/public/',
    contentBase: [ path.join(__dirname, '/../') ],
    watchContentBase: true
  },

  start: {
    webpack: {
      devtool: 'source-map',
      plugins: [
        new webpack.LoaderOptionsPlugin({
          debug: true
        }),
        // Create a custom plugin to run after the build has finished
        {
          apply: (compiler) => {
            compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
              // open the application once the build has finished
              if (firstBuild) {
                opn('http://localhost:' + port)
              }
              firstBuild = false
            })
          }
        }
      ]
    }
  }
}
