import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'
import App from './components/App.jsx'
import Tournaments from './components/Tournaments.jsx'

render(
  <Router>
    <Route path='/' component={App}>
			<Route path='tournaments' component={Tournaments} />
    </Route>
  </Router>
, document.getElementById('app'))

// create route for single tournament view
