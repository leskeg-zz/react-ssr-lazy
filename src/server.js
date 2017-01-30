import express from 'express'
import fs from 'fs'
import React from 'react/dist/react.min'
import {renderToString} from 'react-dom/server'
import RouterContext from 'react-router/lib/RouterContext'
import match from 'react-router/lib/match'
import compression from 'compression'
import path from 'path'
import routes from './routes'

const { appCss, appHtml, appPublic, publicPath, enc } = require('../config/constants')
const srv = express()
const PORT = 8080
const rootElement = '<div id="root">'
const styleElement = '<style>'
const indexCss = fs.readFileSync(path.join(__dirname, 'index.css'), enc)
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), enc)
										.replace(/<link[^>]*stylesheet.>/g,'')
										.replace(`${styleElement}`, `${styleElement}${indexCss}`)

srv.use(compression({level: 9}))
srv.use(publicPath, express.static(appPublic, {index: false}))

// srv.get('/test', (req, res) => res.send('test'))

srv.get('/*', (req, res) => {
	global.navigator = { userAgent: req.headers['user-agent'] }
	global.location = ''
	match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
		const routes = renderProps ? renderProps.routes : null

		// 404
		if (routes === null || routes[routes.length - 1].path === '*') {
			res.redirect('/')
			return
		}

		const app = renderToString(<RouterContext {...renderProps} />)
		const html = indexHtml.replace(`${rootElement}`, `${rootElement}${app}`) || err
		res.send(html)
	})
})

srv.listen(PORT, () => console.log(`http://localhost:${PORT}`))
