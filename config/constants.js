const path = require('path')

const appRoot = process.cwd();

resolveApp = (relativePath) => path.resolve(appRoot, relativePath)

module.exports = {
  appRoot,
  enc: 'utf-8',
  publicPath: '/public/',
  appSrc: resolveApp('src'),
  appDist: resolveApp('dist'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('dist/public'),
  appIndexJs: resolveApp('src/index.js'),
  appHtml: resolveApp('src/index.html'),
  appCss: resolveApp('src/index.css'),
  appRoutes: resolveApp('src/routes.js'),
  appBabelrc: resolveApp('.babelrc')
}
