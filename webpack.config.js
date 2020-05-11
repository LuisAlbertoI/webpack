const path = require('path');
const { smart } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TersetJSPlugin = require('terser-webpack-plugin');

module.exports = env => {
  // Common Configuration
  const common = {
    entry: {
      main: path.join(__dirname, './src/index.js')
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'static/js/[name].[hash:8].js',
      chunkFilename: 'static/js/[id].[chunkhash:8].js',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json']
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
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            outputPath: 'static/media'
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, './public/index.html')
      })
    ]
  };
  // Mode Production
  const production = smart(common, {
    mode: 'production',
    optimization: {
      minimizer: [
        new TersetJSPlugin(),
        new OptimizeCSSAssetsPlugin()
      ]
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
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[hash:8].css',
        chunkFilename: 'static/css/[id].[hash:8].css'
      }),
      new FaviconsWebpackPlugin({
        logo: path.join(__dirname, 'public/logo.png'),
        favicons: {
          appName: 'my-app',
          appDescription: 'My awesome App',
          developerName: 'Me',
          developerURL: '/',
          background: '#ddd',
          theme_color: '#333',
          icons: {
            coast: false,
            yandex: false
          }
        }
      }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['**/*'],
      })
    ]
  });
  // Mode Development
  const development = smart(common, {
    mode: 'development',
    output: {
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    },
    devServer: {
      contentBase: path.join(__dirname, '/'),
      historyApiFallback: true,
      compress: true,
      open: true,
      port: 3000
    }
  });
  // Eval Mode
  return env.development ? development : production;
} 