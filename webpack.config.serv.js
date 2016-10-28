var webpack = require('webpack');
var path = require('path');
var webpackConfig = require('./webpack.config');

webpackConfig.config.devtool = undefined;

webpackConfig.config.entry = {
	routes: path.join(__dirname, 'src', 'routes', 'index.js')
};

webpackConfig.config.output = {
	filename: '[name].js',
	path: path.join(__dirname, 'dist'),
	libraryTarget: 'commonjs2'
};

webpackConfig.config.module.loaders[0].query = {
		presets: ['react', 'latest'],
		plugins: [
				'transform-decorators-legacy',
				'transform-class-properties',
				'remove-webpack'
		]
}

path.join(__dirname, 'src', 'routes', 'index.js');

webpackConfig.config.plugins = [
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	}),
	new webpack.DefinePlugin({
    'process.env':{
      'NODE_ENV': JSON.stringify('production')
    }
  })
];

module.exports = webpackConfig.config;
