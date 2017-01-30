 const webpack = require('webpack')
 const HtmlWebpackPlugin = require('html-webpack-plugin')
 const ExtractTextPlugin = require('extract-text-webpack-plugin')
 const CleanWebpackPlugin = require('clean-webpack-plugin')
 const { appRoot } = require('./constants')
 let conf = require('./webpack.config')

conf.module.loaders.find(loader => loader.loader.includes('css-loader')).loader = ExtractTextPlugin.extract(
	'style',
	'css?modules&importLoaders=1&localIdentName=[path][name]-[local]_[hash:base64:5]!postcss'
)

conf.plugins.find(plugin => plugin instanceof HtmlWebpackPlugin).options.minify = {
	collapseWhitespace: true,
	collapseInlineTagWhitespace: true,
	removeEmptyAttributes: true,
	removeOptionalTags: true,
	removeRedundantAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
	minifyCSS: true
}

conf.plugins = conf.plugins.concat([
	new ExtractTextPlugin('../index.css'),
	new CleanWebpackPlugin(['dist'], {
			root: appRoot,
			verbose: true,
			dry: false
	}),
	new webpack.DefinePlugin({
		'process.env':{
			'NODE_ENV': JSON.stringify('production')
		}
	}),
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		},
		output: {
    	comments: false
    }
	}),
	new webpack.optimize.DedupePlugin()
])

module.exports = conf
