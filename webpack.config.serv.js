const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
let webpackConfig = require('./webpack.config')
let babelrc = JSON.parse(fs.readFileSync(path.join(__dirname, '.babelrc'), 'utf-8'))

babelrc.plugins.push('remove-webpack')

webpackConfig.entry = {
	routes: path.join(__dirname, 'src', 'routes', 'index.js')
};

webpackConfig.output = {
	filename: '[name].js',
	path: path.join(__dirname, 'dist'),
	libraryTarget: 'commonjs2'
};

webpackConfig.module.loaders.find(loader => loader.loader.includes('babel-loader')).query = babelrc

webpackConfig.module.loaders.find(loader => loader.loader.includes('css-loader')).loader =
	'css-loader/locals?modules&importLoaders=1&localIdentName=[path][name]-[local]_[hash:base64:5]!postcss'

webpackConfig.externals = ['react', 'react-dom', 'react-router']

webpackConfig.plugins = [
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
]

module.exports = webpackConfig
