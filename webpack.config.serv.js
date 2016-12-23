var webpack = require('webpack');
var path = require('path');
var webpackConfig = require('./webpack.config');
var fs = require('fs');
var babelrc = JSON.parse(fs.readFileSync(path.join(__dirname, '.babelrc'), 'utf-8'));

babelrc.plugins.push('remove-webpack');

webpackConfig.config.entry = {
	routes: path.join(__dirname, 'src', 'routes', 'index.js')
};

webpackConfig.config.output = {
	filename: '[name].js',
	path: path.join(__dirname, 'dist'),
	libraryTarget: 'commonjs2'
};

webpackConfig.config.module.loaders[0].query = babelrc;

webpackConfig.config.module.loaders[1].loader = 'css/locals?modules&importLoaders=1&localIdentName=[path][name]-[local]_[hash:base64:5]!postcss';

webpackConfig.config.externals = ['react', 'react-dom', 'react-router'];

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
