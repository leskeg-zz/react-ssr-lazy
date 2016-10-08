// polyfill webpack require.ensure
if (typeof require.ensure !== 'function')
    require.ensure = (d, c) => c(require)

export default {
  path: '/about',
  getComponent(nextState, cb) {
	  require.ensure([], (require) => {
        cb(null, require('../views/About').default)
      })
  }
}
