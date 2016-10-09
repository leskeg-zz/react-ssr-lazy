var HtmlWebpackPlugin = require('html-webpack-plugin');
var isProd = (process.env.NODE_ENV === 'production');

module.exports = {
    entry: {
		client: './src/client.js'
	},
    output: {
        filename: '[name].bundle.js',
        path: './dist/static/'
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
		inline: true,
		hrm: true,
		progress: true,
        historyApiFallback: true
    },
    plugins: [new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: isProd
                ? 'app.html'
                : 'index.html'
        })]
};
