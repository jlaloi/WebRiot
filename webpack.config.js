const prod = process.argv.indexOf('-p') !== -1;
var webpack = require('webpack');

var config = {
    entry: {
        app: [
            './src/js/main.js'
        ],
        lib: [
            './node_modules/babel-polyfill/dist/polyfill.min.js'
        ]
    },
    output: {
        filename: './public/[name].bundle.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            riot: 'riot'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                enforce: 'pre',
                test: /\.tag$/,
                exclude: /node_modules/,
                loader: 'riotjs-loader'
            },
            {
                test: /\.(js|tag)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'es2015']
                }
            }
        ]
    }
};

if (!prod) {
    var LiveReloadPlugin = require('webpack-livereload-plugin');
    config.plugins.push(new LiveReloadPlugin({ 'appendScriptTag': true }));
}

module.exports = config;