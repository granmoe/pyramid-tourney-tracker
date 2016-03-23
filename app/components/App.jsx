import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import store from '../store'
import actions from '../actions'
import C from '../constants'

// react components
import Wrapper from './Wrapper.jsx'
import Login from '../pages/login/Login.jsx'
import Tournaments from '../pages/tournaments/Tournaments.jsx'
import TournamentsWrapper from '../pages/tournaments/TournamentsWrapper.jsx'
// import Teams from '../pages/teams/Teams.jsx'
// import TeamFormWrapper from '../pages/teams/TeamFormWrapper.jsx'

class App extends React.Component {
  componentWillMount() {
    this.requireAuth = this.requireAuth.bind(this)
	store.dispatch(actions.startListeningToAuth())
    store.dispatch(actions.startListeningToTournaments())
	store.dispatch(actions.startListeningToProfiles())
	//store.dispatch(actions.startListeningToTeams())
  }

  requireAuth(nextState, replace) {
    if (this.props.authStatus !== C.LOGGED_IN) {
	  replace({
	  	pathname: '/login',
	  	state: { nextPathname: nextState.location.pathname }
	  })
    }
  }

  render() {
	return (
      <Router history={browserHistory}>
        <Route path='/' component={Wrapper}>
          <Route path='login' component={Login} />

	      <Route path='tournaments' component={TournamentsWrapper} onEnter={this.requireAuth}>
  	        <Route path='create' component={Tournaments} />
  	        <Route path='browse' component={Tournaments} />
          </Route>
        </Route>
      </Router>
	)
  }
}
//	      <Route path='teams' component={Teams} onEnter={this.requireAuth} uid={this.props.uid} />
//	          <Route path='teams/create' component={TeamFormWrapper} onEnter={this.requireAuth} uid={this.props.uid} />

export default connect( state => {
  return {
    authStatus: state.auth.current,
    uid: state.auth.uid
  }
})(App)
