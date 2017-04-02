// start dev server
// webpack-dev-server --hot
var publicPath = 'http://localhost:4000';
const webpack = require('webpack');

var path = require('path');
module.exports  = {
    devServer: {
        contentBase: './build',
        host: 'localhost',
        port: 4000,
        hot: true,
    },
    entry: {
        root: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?' + publicPath,
            'webpack/hot/only-dev-server',
            './index.js'
        ],
        page_task_templates: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?' + publicPath,
            'webpack/hot/only-dev-server',
            './page_task_templates.js'
        ],
    },
    output: {
        filename: "[name].bundle.js",
        path: path.join(__dirname, 'build'),
    },
    module: {
        loaders: [{
            test: /\.js$/, 
            loader: 'babel-loader', 
            exclude: /node_modules/
        }],
    },
};
