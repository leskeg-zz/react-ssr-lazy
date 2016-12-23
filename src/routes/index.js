import Index from '../Index'
import aboutRoute from './about'
import {browserHistory} from 'react-router'

export default {
	childRoutes : [
		{
			path: '/',
			component: Index,
			indexRoute: {
				getComponent(nextState, cb) {
					require.ensure([], (require) => {
						cb(null, require('../views/Home').default)
					})
				}
			},
			childRoutes: [aboutRoute]
		}, {
			path: '*', //404
			onEnter: () => {
				if (browserHistory)
					browserHistory.replace('/');
				}
			}
	]
};
