var	path = require('path');

module.exports.config = {
	entry: {
		client: path.join(__dirname, 'src/client.js'),
		common: ['react', 'react-router', 'mobx-react', 'mobx', './src/store.js']
	},
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[id].chunk.js',
		path: path.join(__dirname, 'dist/static'),
		publicPath: '/static/'
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
	devtool: 'source-map'
};

module.exports.commonsChunkPluginOptions = {name: 'common'};

module.exports.htmlWebpackPluginOptions = {
	template: path.join(__dirname, 'src/index.html'),
	filename: '../index.html'
};
