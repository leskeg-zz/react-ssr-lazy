let conf = require('./webpack.config')

conf.devtool = 'source-map'

conf.devServer = {
	progress: true,
	historyApiFallback: {
		index: '/static/'
	}
}

conf.module.loaders.find(loader =>	loader.loader.includes('babel-loader'))
	.loader = 'react-hot!babel-loader'

module.exports = conf
