import express from 'express';
import fs from 'fs';
import React from 'react/dist/react.min';
import {renderToString} from 'react-dom/server';
import RouterContext from 'react-router/lib/RouterContext';
import match from 'react-router/lib/match';
import routes from './routes';

const app = express();
const PORT = 8080;
const staticPath = `${__dirname}/static/`;

app.use(express.static(staticPath));

// app.get('/test', (req, res) => res.send('test'));

app.get('*', (req, res) => {
    match({
        routes,
        location: req.url
    }, (error, redirectLocation, renderProps) => {
        const app = renderToString(<RouterContext {...renderProps}/>);
        fs.readFile(`${staticPath}app.html`, 'utf8', (err, data = '') =>
			res.send(data.replace('id="app">', `id="app">${app}`)) || err);
    });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
