const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require('path');



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
        loaders:[
            {
                test:/\.css$/,
                loaders:['style-loader','css-loader']
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
            exclude:['manifest.json','img/**/*'],
            verbose: true,
            dry: false
        })
    ]
}