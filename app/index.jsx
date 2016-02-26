import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

// react components
import App from './components/App.jsx'
import Tournaments from './components/Tournaments.jsx'
import Teams from './components/Teams.jsx'
import Login from './components/Login.jsx'

// styles
import './stylesheets/index.less'

// firebase interface
import data from './utilities/data-service.js'

function requireAuth(nextState, replace) {
	if (!data.isLoggedIn()) {
		replace({
			pathname: '/login',
			state: { nextPathname: nextState.location.pathname }
		})
	}
}

var userid

data.root.onAuth( authData => {
  if (authData) {
    userid = authData.uid
  } else {
    userid = null
  }
})

render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
			<Route path='tournaments' component={Tournaments} />
			<Route path='login' component={Login} />
			<Route path='teams' component={Teams} onEnter={requireAuth} uid={userid} />
    </Route>
  </Router>
, document.getElementById('app'))



// TODO:
// create route for single tournament view
//			<Route path='matches' component={Matches} onEnter={requireAuth} />
