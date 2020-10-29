const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  output: {
    publicPath: 'http://localhost:3000/'
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    historyApiFallback: true,
    compress: true,
    open: true,
    port: 3000
  }
});