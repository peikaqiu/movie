'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const data = require('../data.json');
const movies = data.movie;
const datatwo = require("../datatwo.json");
const moviess = datatwo.movie;
const superagent = require('superagent');

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    before:function (app) {
    /*  app.get('/api/test',function (req,res) {
        console.log(req.query)
      })*/
      app.get('/api/mydata', function (req, res) {
        res.json({
          errno: 0,  // 真实开发中,根据errno是否请求成功数据
          data: movies
        })
      })
      app.get('/api/myaddress',function (req,res) {
        res.json({
          errno:0,
          data:moviess
        })
      })
      app.get('/api/showing',function (req,res) {
        superagent.get('https://api.douban.com/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b')
          .end((err,data) => {
          if(err){
            console.log(err);
          }
          res.json(data.text)
          })
      })
      app.get('/api/soon',function (req,res) {
        superagent.get('https://api.douban.com/v2/movie/coming_soon?apikey=0b2bdeda43b5688921839c8ecb20399b')
          .end((err,data) => {
            if(err){
              console.log(err);
            }
            res.json(data.text)
          })
      })
      app.get('/api/movie',function (req,res) {
        superagent.get('https://api.douban.com/v2/movie/weekly?apikey=0b2bdeda43b5688921839c8ecb20399b')
          .end((err,data) => {
            if(err){
              console.log(err);
            }
            res.json(data.text)
          })
      })
      app.get('/api/pic',function (req,res) {
        superagent.get('https://api.douban.com/v2/movie/new_movies?apikey=0b2bdeda43b5688921839c8ecb20399b')
          .end((err,data) => {
            if(err){
              console.log(err);
            }
            res.json(data.text)
          })
      })
      app.get('/api/search',function (req,res) {
        superagent.get('https://api.douban.com/v2/movie/search?')
          .query(req.query)
          .end((err,data) => {
            if(err){
              console.log(err);
            }
            res.json(data.text)
          })
      })
    },
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
