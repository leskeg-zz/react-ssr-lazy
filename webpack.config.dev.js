var webpack = require('webpack');
var	HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpackConfig = require('./webpack.config');

webpackConfig.config.devServer = {
	inline: true,
	hrm: true,
	progress: true,
	historyApiFallback: {
		index: '/static/'
	}
};

webpackConfig.config.plugins = [
	new ExtractTextPlugin("index.css"),
	new HtmlWebpackPlugin(webpackConfig.htmlWebpackPluginOptions),
	new webpack.optimize.CommonsChunkPlugin(webpackConfig.commonsChunkPluginOptions),
	new webpack.optimize.OccurrenceOrderPlugin(true)
];

module.exports = webpackConfig.config;
