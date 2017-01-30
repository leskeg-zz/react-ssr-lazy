const { publicPath } = require('./constants')
let conf = require('./webpack.config')

conf.devtool = 'source-map'

conf.devServer = {
	progress: true,
	historyApiFallback: {
		index: publicPath
	}
}

conf.module.loaders.find(loader =>	loader.loader.includes('babel-loader'))
	.loader = 'react-hot-loader!babel-loader'

module.exports = conf
