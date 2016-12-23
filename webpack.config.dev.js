let conf = require('./webpack.config')

conf.devtool = 'source-map'

conf.devServer = {
	progress: true,
	historyApiFallback: {
		index: '/static/'
	}
}

module.exports = conf
