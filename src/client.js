import React from 'react';
import {render} from 'react-dom';
import {Router, hashHistory, match} from 'react-router';
import routes from './routes';

const app = document.getElementById('app');

match({ routes, location }, () => {
  render(
    <Router routes={routes} history={hashHistory} />,
    document.getElementById('app')
  )
});
