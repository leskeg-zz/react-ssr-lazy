import express from 'express';
import fs from 'fs';
import React from 'react';
import {renderToString} from 'react-dom/server';
import App from './App';

const app = express();
const PORT = 3000;

app.use(express.static('dist'));

app.get('/', (req, res) => {
	const app = renderToString(<App />);
	const html = fs.readFile('./index.html', 'utf8', (err,data) =>
		data.replace('id="app">', `id="app">${app}`) || err);
    res.send(html);
});

app.listen(PORT, () => console.log('http://localhost:' + PORT));
