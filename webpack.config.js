var webpack = require('webpack'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	path = require('path');

module.exports = {
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
		],
		noParse: /node_modules\/react\/dist/
	},
	devtool: 'source-map',
	resolve: {
		alias: {
			'react': path.join(__dirname, 'node_modules/react/dist/react.min'),
			'react-router': path.join(__dirname, 'node_modules/react-router/umd/ReactRouter.min'),
			'react-dom': path.join(__dirname, 'node_modules/react-dom/dist/react-dom.min'),
			'mobx': path.join(__dirname, 'node_modules/mobx/lib/mobx.min')
		},
		fallback: path.join(__dirname, 'node_modules')
	},
	devServer: {
		inline: true,
		hrm: true,
		progress: true,
		historyApiFallback: {
			index: '/static/'
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src/index.html'),
			filename: '../index.html',
			minify: {
				collapseWhitespace: true,
				collapseInlineTagWhitespace: true,
				removeEmptyAttributes: true,
				removeOptionalTags: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true
			}
		}),
		new webpack.optimize.UglifyJsPlugin({compress: false}),
		new webpack.optimize.CommonsChunkPlugin({name: 'common', minChunks: 2})
	]
};
