const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    main: path.join(__dirname, 'src/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'static/js/[name].[fullhash:8].js',
    chunkFilename: 'static/js/[id].[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.(jpe?g|png|svg|gif|mp4|eot|ttf|woff?)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 90000,
            fallback: {
              loader: 'file-loader',
              options: {
                name: '[name].[hash:8].[ext]',
                publicPath: "/static/media",
                outputPath: 'static/media'
              }
            }
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html')
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
}