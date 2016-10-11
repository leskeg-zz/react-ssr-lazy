var webpack = require('webpack');
var	HtmlWebpackPlugin = require('html-webpack-plugin');
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
	new webpack.optimize.CommonsChunkPlugin(webpackConfig.commonsChunkPluginOptions),
	new HtmlWebpackPlugin(webpackConfig.htmlWebpackPluginOptions)
];

module.exports = webpackConfig.config;
