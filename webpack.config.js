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
        'tesser.js': './app/tesser.js',
    },
    output:{
        path:path.resolve(__dirname,'extension'),
        filename: '[name]'
    },
    module:{
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query:
                {
                    presets: ['es2015'],
                    plugins: ['transform-runtime']
                }
        }],
        rules: [
            {
                test: /\.css$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
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
                ignore: ['tesser.js','index.tmpl.html']
            }
        ])
    ]
}