import express from 'express';
import fs from 'fs';
import React from 'react/dist/react.min';
import {renderToString} from 'react-dom/server';
import RouterContext from 'react-router/lib/RouterContext';
import match from 'react-router/lib/match';
import path from 'path';
import compression from 'compression';
import routes from './routes';

const srv = express();
const PORT = 8080;
const root = '<div id="app">';
let html;

srv.use(compression({level: 9}));
srv.use('/static', express.static(path.join(__dirname, 'static'), {index: false}));

// srv.get('/test', (req, res) => res.send('test'));

srv.get('*', (req, res) => {
	match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
		const routes = renderProps ? renderProps.routes : null;

		// 404
		if (routes === null || routes[routes.length - 1].path === '*') {
			res.redirect('/');
			return;
		}

		if (html) {
			res.send(html);
			return;
		}

		fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err = '', indexHtml = '') => {
			global.navigator = { userAgent: req.headers[ 'user-agent' ] };
			const app = renderToString(<RouterContext {...renderProps} />);
			html = indexHtml.replace(`${root}`, `${root}${app}`) || err;
			res.send(html);
		});

	});
});

srv.listen(PORT, () => console.log(`http://localhost:${PORT}`));
