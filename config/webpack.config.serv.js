const webpack = require('webpack')
const fs = require('fs')
const { appBabelrc, appRoutes, appDist, enc } = require('./constants')
let conf = require('./webpack.config')
let babelrc = JSON.parse(fs.readFileSync(appBabelrc, enc))

babelrc.plugins.push('remove-webpack')

conf.entry = {
	routes: appRoutes
};

conf.output = {
	filename: '[name].js',
	path: appDist,
	libraryTarget: 'commonjs2'
};

conf.module.loaders.find(loader => loader.loader.includes('babel-loader')).query = babelrc

conf.module.loaders.find(loader => loader.loader.includes('css-loader')).loader =
	'css-loader/locals?modules&importLoaders=1&localIdentName=[path][name]-[local]_[hash:base64:5]!postcss'

conf.externals = ['react', 'react-dom', 'react-router']

conf.plugins = [
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

module.exports = conf
