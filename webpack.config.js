var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var isProd = (process.env.NODE_ENV === 'production');

module.exports = {
	entry: {
		client: './src/client.js',
		vendor: ['react', 'react-router', 'mobx-react', 'mobx']
	},
	output: {
		filename: '[name].bundle.js',
		path: './dist/static/'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					"presets": [
						"react", "latest"
					],
					"plugins": ["transform-decorators-legacy", "transform-class-properties"]
				}
			}
		],
		noParse: /node_modules\/react\/dist/
	},
	devtool: 'cheap-module-source-map',
	resolve: {
		alias: {
			'react': __dirname + '/node_modules/react/dist/react.min',
			'react-router': __dirname + '/node_modules/react-router/umd/ReactRouter.min',
			'react-dom': __dirname + '/node_modules/react-dom/dist/react-dom.min',
			'mobx': __dirname + '/node_modules/mobx/lib/mobx.min'
		},
		fallback: __dirname + './node_modules'
	},
	devServer: {
		inline: true,
		hrm: true,
		progress: true,
		historyApiFallback: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: isProd
				? 'app.html'
				: 'index.html'
		}),
		new webpack.optimize.UglifyJsPlugin({compress: false}),
		new webpack.optimize.CommonsChunkPlugin({name: 'vendor', minChunks: 2})
	]
};
