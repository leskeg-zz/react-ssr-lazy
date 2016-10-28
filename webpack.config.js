var path = require('path');
var embedFileSize = 65536;
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports.config = {
	entry: {
		client: path.join(__dirname, 'src', 'client.js'),
		common: ['react', 'react-router']
	},
	output: {
		filename: '[name]-bundle_[hash].js',
		chunkFilename: '[id]-chunk_[hash].js',
		path: path.join(__dirname, 'dist', 'static'),
		publicPath: '/static/'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel'
		}, {
			test: /\.css$/,
			loader: ExtractTextPlugin.extract(
				'style?sourceMap',
				'css?sourceMap&modules&importLoaders=1&localIdentName=[path][name]-[local]_[hash:base64:5]'
			)
		}, {
			test: /\.json$/,
			loader: 'json'
		}, {
			test: /\.mp4$/,
			loader: 'url?limit=' + embedFileSize + '&mimetype=video/mp4'
		}, {
			test: /\.(jpe?g|png|gif|svg)$/i,
			loader: 'url?limit=' + embedFileSize + '&mimetype=image/[ext]'
		}, {
			test: /\.(otf|eot|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: 'url?limit=' + embedFileSize
		}]
	},
	devtool: 'source-map'
};

module.exports.commonsChunkPluginOptions = {
	name: 'common'
};

module.exports.htmlWebpackPluginOptions = {
	template: path.join(__dirname, 'src', 'index.html'),
	filename: '../index.html'
};
