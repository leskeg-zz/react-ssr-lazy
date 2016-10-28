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
const rootElement = '<div id="app">';
const styleElement = '<style>';
const enc = 'utf-8';
const indexCss = fs.readFileSync(path.join(__dirname, 'index.css'), enc);
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), enc).replace(`${styleElement}`, `${styleElement}${indexCss}`);

srv.use(compression({level: 9}));
srv.use('/static', express.static(path.join(__dirname, 'static'), {index: false}));

// srv.get('/test', (req, res) => res.send('test'));

srv.get('*', (req, res) => {
	match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
		global.navigator = { userAgent: req.headers[ 'user-agent' ] };
		const routes = renderProps ? renderProps.routes : null;

		// 404
		if (routes === null || routes[routes.length - 1].path === '*') {
			res.redirect('/');
			return;
		}

		const app = renderToString(<RouterContext {...renderProps} />);
		const html = indexHtml.replace(`${rootElement}`, `${rootElement}${app}`) || err;
		res.send(html);
	});
});

srv.listen(PORT, () => console.log(`http://localhost:${PORT}`));
