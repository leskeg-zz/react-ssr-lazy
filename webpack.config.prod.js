var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path');
var webpackConfig = require('./webpack.config');

webpackConfig.config.module.noParse = /node_modules\/react\/dist/;

webpackConfig.htmlWebpackPluginOptions.minify = {
	collapseWhitespace: true,
	collapseInlineTagWhitespace: true,
	removeEmptyAttributes: true,
	removeOptionalTags: true,
	removeRedundantAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
	minifyCSS: true
};

webpackConfig.config.plugins = [
	new HtmlWebpackPlugin(webpackConfig.htmlWebpackPluginOptions),
	new webpack.optimize.CommonsChunkPlugin(webpackConfig.commonsChunkPluginOptions),
	new webpack.optimize.OccurrenceOrderPlugin(true),
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	}),
	new CleanWebpackPlugin(['dist'], {
      root: __dirname,
      verbose: true,
      dry: false
  }),
	new webpack.DefinePlugin({
    'process.env':{
      'NODE_ENV': JSON.stringify('production')
    }
  }),
	new webpack.optimize.DedupePlugin()
];

module.exports = webpackConfig.config;
