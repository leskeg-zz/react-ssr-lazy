const webpack = require('webpack')
const	HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const { appIndexJs, appPublic, publicPath, appHtml } = require('./constants')
const embedFileSize = 65536

module.exports = {
	entry: {
		index: appIndexJs,
		common: ['react', 'react-router']
	},
	output: {
		filename: '[name]-bundle_[hash].js',
		chunkFilename: '[id]-chunk_[hash].js',
		path: appPublic,
		publicPath: publicPath
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {
			test: /\.css$/,
			loader: `style-loader?sourceMap
				!css-loader?sourceMap&modules&importLoaders=1&localIdentName=[path][name]-[local]_[hash:base64:5]
				!postcss-loader`
		}, {
			test: /\.json$/,
			loader: 'json-loader'
		}, {
			test: /\.mp4$/,
			loader: `url-loader?limit=${embedFileSize}&mimetype=video/mp4`
		}, {
			test: /\.(jpe?g|png|gif|svg)$/i,
			loader: `url-loader?limit=${embedFileSize}&mimetype=image/[ext]`
		}, {
			test: /\.(otf|eot|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: `url-loader?limit=${embedFileSize}`
		}]
	},
	postcss: [ autoprefixer({ browsers: ['last 2 versions', '> 5%'] }) ],
	plugins: [
		new HtmlWebpackPlugin({
			template: appHtml,
			filename: '../index.html'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common'
		}),
		new webpack.optimize.OccurrenceOrderPlugin(true)
	]
}
