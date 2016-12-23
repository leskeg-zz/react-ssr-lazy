var webpack = require('webpack');
var	HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackConfig = require('./webpack.config');

webpackConfig.config.devtool = 'source-map';

webpackConfig.config.devServer = {
	progress: true,
	historyApiFallback: {
		index: '/static/'
	}
};

webpackConfig.config.plugins = [
	new HtmlWebpackPlugin(webpackConfig.htmlWebpackPluginOptions),
	new webpack.optimize.CommonsChunkPlugin(webpackConfig.commonsChunkPluginOptions),
	new webpack.optimize.OccurrenceOrderPlugin(true)
];

module.exports = webpackConfig.config;
