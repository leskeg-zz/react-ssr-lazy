export default {
  path: '/about',
  getComponent(nextState, cb) {
	  require.ensure([], (require) => {
        cb(null, require('../views/About').default)
      })
  }
}
