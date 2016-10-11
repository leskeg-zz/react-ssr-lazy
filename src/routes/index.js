import App from '../App';
import aboutRoute from './about';
import {browserHistory} from 'react-router';

export default {
	childRoutes : [
		{
			path: '/',
			component: App,
			indexRoute: {
				getComponent(nextState, cb) {
					require.ensure([], (require) => {
						cb(null, require('../views/Index').default)
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
