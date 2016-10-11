import express from 'express';
import fs from 'fs';
import React from 'react/dist/react.min';
import {renderToString} from 'react-dom/server';
import RouterContext from 'react-router/lib/RouterContext';
import match from 'react-router/lib/match';
import path from 'path';
import compression from 'compression';
import routes from './routes';

const app = express();
const PORT = 8080;

app.use(compression({level: 9}));
app.use('/static', express.static(path.join(__dirname, 'static'), {index: false}));

// app.get('/test', (req, res) => res.send('test'));

app.get('*', (req, res) => {
	match({
		routes,
		location: req.url
	}, (error, redirectLocation, renderProps) => {
		const routes = renderProps ? renderProps.routes : null;

		// 404
		if (routes === null || routes[routes.length - 1].path === '*') {
			res.redirect('/');
			return;
		}

		fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err = '', indexHtml = '') => {
			const app = renderToString(<RouterContext {...renderProps}/>);
			const html = indexHtml.replace('id="app">', `id="app">${app}`) || err;
			res.send(html);
		});
	});
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
