let webpackConfig = require('./webpack.config')

webpackConfig.devtool = 'source-map'

webpackConfig.devServer = {
	progress: true,
	historyApiFallback: {
		index: '/static/'
	}
}

module.exports = webpackConfig
