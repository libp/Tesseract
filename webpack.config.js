"use strict";
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');



module.exports ={
    devtool: 'eval-source-map',
    entry:{
        'background.js': './app/background.js',

    },
    output:{
        path:path.resolve(__dirname,'extension'),
        filename: '[name]'
    },
    module:{
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("style.css"),
        new CleanWebpackPlugin('extension/', {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new CopyWebpackPlugin([
            {
                from: 'app',
                ignore: ['*.js','*.html']
            }
        ])
    ]
}