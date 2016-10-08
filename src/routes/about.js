const aboutRoute = {
  path: '/services',
  getComponent(nextState, cb) {
    require.ensure([], (require) => cb(null, require('../views/About').default))
  }
}

export default aboutRoute;
