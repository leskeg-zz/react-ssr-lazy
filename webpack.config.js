var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: __dirname + '/src/client.js',
	output: {
		filename: 'bundle.js',
		path: __dirname + '/dist',
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
		port: 3000,
		historyApiFallback: {
			index: 'index.html'
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: __dirname + '/src/index.html'
		}),
	]
};
