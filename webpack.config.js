var path = require('path');
var webpack = require('webpack');

var node_dir = __dirname + '/node_modules';

module.exports = {
    entry: './src/main/js/app.js',
    devtool: 'sourcemaps',
    cache: false,
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ],
    resolve: {
        alias: {
            'stompjs': node_dir + '/stompjs/lib/stomp.js'
        }
    },
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js'
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    presets: ['env', 'react','stage-2']

                }
            }

        ]
    }
};