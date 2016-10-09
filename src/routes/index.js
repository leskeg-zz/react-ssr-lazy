import App from '../App';
import aboutRoute from './about';

export default {
    childRoutes: [
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
        }
    ]
};
