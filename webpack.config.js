const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        index: path.join(__dirname, './src/index.js')
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader"
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(jpg|png|gif|woff|eot|ttf|svg)$/,
                use: {
                  loader: 'url-loader',
                  options: {
                    limit: 1000000,
                  }
                }
            },
            {
                test: /\.(mp4|webm|avi)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: 'movies/[name].[ext]',
                    },
                  },
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.join(__dirname, './public/index.html'),
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new FaviconsWebpackPlugin({
            logo: './public/icon.png',
            prefix: 'assets/',
            inject: true,
            background: '#fff',
            title: 'React - Webpack',
            icons: {
              android: true,
              appleIcon: true,
              favicons: true,
              opengraph: false,
              twitter: false,
            }
        })
    ],
    resolve: {
        extensions: [".js", ".jsx"]
    },
    devServer: {
        contentBase: path.join(__dirname, './'),
        compress: true,
        open: true,
        port: 3000
    }
}