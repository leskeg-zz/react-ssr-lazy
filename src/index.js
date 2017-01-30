import React from 'react'
import {render} from 'react-dom'
import {Router, browserHistory, match} from 'react-router'
import routes from './routes'
import './index.css'

match({ routes, location }, () => {
  render(
    <Router routes={routes} history={browserHistory} />,
    document.getElementById('root')
  )
})
