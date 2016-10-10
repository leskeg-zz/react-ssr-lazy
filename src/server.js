import express from 'express';
import fs from 'fs';
import React from 'react/dist/react.min';
import {renderToString} from 'react-dom/server';
import RouterContext from 'react-router/lib/RouterContext';
import match from 'react-router/lib/match';
import path from 'path';
import routes from './routes';

const app = express();
const PORT = 8080;
const staticPath = path.join(__dirname, 'static');

app.use(express.static(staticPath, {index: false}));

// app.get('/test', (req, res) => res.send('test'));

app.get('*', (req, res) => {
	match({
		routes,
		location: req.url
	}, (error, redirectLocation, renderProps) => {

		// 404
		if (renderProps === undefined) {
			res.redirect('/');
			return;
		}

		fs.readFile(path.join(staticPath, 'index.html'), 'utf8', (err, data = '') => {
			const app = renderToString(<RouterContext {...renderProps}/>);
			res.send(data.replace('id="app">', `id="app">${app}`)) || err;
		});
	});
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
