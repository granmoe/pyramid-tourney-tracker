import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

// react components
import App from './components/App.jsx'
import Tournaments from './components/Tournaments.jsx'
import Login from './components/Login.jsx'

// styles
import './stylesheets/index.less'

render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
			<Route path='tournaments' component={Tournaments} />
			<Route path='login' component={Login} />
    </Route>
  </Router>
, document.getElementById('app'))

// create route for single tournament view
