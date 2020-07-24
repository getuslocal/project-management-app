const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpe?g|png|gif|woff2?|eot|ttf|otf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: { limit: 15000 },
                    },
                ],
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        port: 3000,
        compress: true,
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './index.html'
        })
    ]
};