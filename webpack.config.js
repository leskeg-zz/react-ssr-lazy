var HtmlWebpackPlugin = require('html-webpack-plugin');
var isProd = (process.env.NODE_ENV === 'production');

module.exports = {
    entry: __dirname + '/src/client.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    },
    devServer: {
        port: 3001,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [new HtmlWebpackPlugin({
            template: __dirname + '/src/app.html',
            filename: isProd
                ? 'app.html'
                : 'index.html'
        })]
};
