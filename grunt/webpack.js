const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

const path = require('path')
module.exports = {
  options: {
    entry: {
      application: './index.js',
      vendor: ['jquery']
    },
    output: {
      filename: '[name].js',
      path: path.join(__dirname, '/../public'),
      publicPath: 'public/'
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader?url=false' }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                url: false
              }
            },
            {
              loader: 'postcss-loader', // Run post css actions
              options: {
                postcssOptions: {
                  plugins: function () { // post css plugins, can be exported to postcss.config.js
                    return [
                      require('autoprefixer')
                    ]
                  }
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: [
                    path.resolve(__dirname, './node_modules')
                  ]
                }
              }
            }]
        },
        {
          test: /\.woff[\d]?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        },
        {
          test: /\.(ttf|eot|svg|png|jpg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader'
        }
      ]
    },
    stats: {
      colors: true,
      modules: true,
      reasons: true,
      performance: false
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false
            }
          },
          extractComments: false
        })
      ]
    },
    // This is the default. It has to be set or a warning prevents windows deploys.
    mode: 'production'
  },
  build: {
    failOnError: true,
    watch: false,
    keepalive: false
  }
}
