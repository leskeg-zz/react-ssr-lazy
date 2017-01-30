import React from 'react'
import {Route, IndexRoute, browserHistory, createRoutes} from 'react-router'
import App from './App'

const Home = (nextState, cb) =>
	require.ensure([], require => cb(null, require('./components/Home').default))

const About = (nextState, cb) =>
	require.ensure([], require =>	cb(null, require('./components/About').default))

const routes = createRoutes(
	<Route path="/" component={App}>
		<IndexRoute getComponent={Home} />
		<Route path="about" getComponent={About} />
	</Route>
)

export default routes
