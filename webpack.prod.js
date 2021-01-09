const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        chunks: 'all',
        minSize: 120000,
        maxSize: 240000,
        vendors: {
          chunks: 'all',
          priority: 1,
          filename: 'static/js/[id].[chunkhash:8].js',
          test: /[\\/]node_modules[\\/]/,
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', 'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[fullhash:8].css',
      chunkFilename: 'static/css/[id].[fullhash:8].css'
    }),
    new FaviconsWebpackPlugin({
      logo: path.join(__dirname, 'public/icon.png'),
      favicons: {
        appName: 'App PWA Test',
        appShortName: 'App PWA',
        appDescription: 'PWA Webpack',
        developerName: 'Luis Alberto I',
        developerURL: 'https://luisalbertoi.com',
        background: '#ddd',
        theme_color: '#333',
        icons: {
          coast: false,
          yandex: false
        }
      }
    }),
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ]
});