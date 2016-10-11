var webpack = require('webpack');
var	HtmlWebpackPlugin = require('html-webpack-plugin');
var	path = require('path');
var webpackConfig = require('./webpack.config');

webpackConfig.config.module.noParse = /node_modules\/react\/dist/;

webpackConfig.config.resolve = {
	alias: {
		'react': path.join(__dirname, 'node_modules/react/dist/react.min'),
		'react-router': path.join(__dirname, 'node_modules/react-router/umd/ReactRouter.min'),
		'react-dom': path.join(__dirname, 'node_modules/react-dom/dist/react-dom.min'),
		'mobx': path.join(__dirname, 'node_modules/mobx/lib/mobx.min')
	},
	fallback: path.join(__dirname, 'node_modules')
};

webpackConfig.htmlWebpackPluginOptions.minify = {
	collapseWhitespace: true,
	collapseInlineTagWhitespace: true,
	removeEmptyAttributes: true,
	removeOptionalTags: true,
	removeRedundantAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true
};

webpackConfig.config.plugins = [
	new HtmlWebpackPlugin(webpackConfig.htmlWebpackPluginOptions),
	new webpack.optimize.CommonsChunkPlugin(webpackConfig.commonsChunkPluginOptions),
	new webpack.optimize.OccurrenceOrderPlugin(true),
	new webpack.optimize.UglifyJsPlugin({compress: false}),
	new webpack.optimize.DedupePlugin()
];

module.exports = webpackConfig.config;
