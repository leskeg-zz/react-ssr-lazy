import App from '../App';
import aboutRoute from './about';

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function')
    require.ensure = (d, c) => c(require)

const indexRoute = {
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

export default indexRoute;
