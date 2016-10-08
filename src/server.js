import express from 'express';
import fs from 'fs';
import React from 'react';
import {renderToString} from 'react-dom/server';
import { match, RouterContext } from 'react-router'
import routes from './routes';

const app = express();
const PORT = 3000;

app.use(express.static('dist'));

app.get('*', (req, res) => {
	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
		const app = renderToString(<RouterContext {...renderProps} />);
		fs.readFile(__dirname + '/app.html', 'utf8', (err,data) => {
			const html = data ? data.replace('id="app">', `id="app">${app}`) : null || err;
	    	res.send(html);
		});
	});
});

app.listen(PORT, () => console.log('http://localhost:' + PORT));
