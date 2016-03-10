import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import store from '../store'
import actions from '../actions'
import C from '../constants'

// react components
import Wrapper from './Wrapper.jsx'
import Tournaments from './Tournaments.jsx'
import TournamentsHandler from './TournamentsHandler.jsx'
import Teams from './Teams.jsx'
import TeamFormWrapper from './TeamFormWrapper.jsx'
import LoginWrapper from './LoginWrapper.jsx'

class App extends React.Component {
  componentWillMount() {
	store.dispatch(actions.startListeningToAuth())
    store.dispatch(actions.startListeningToTournaments())
	//store.dispatch(actions.startListeningToProfiles())
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
          <Route path='login' component={LoginWrapper} />

	      <Route path='tournaments' component={TournamentsHandler} onEnter={this.requireAuth.bind(this)}>
  	      <Route path='create' component={Tournaments} />
  	      <Route path='browse' component={Tournaments} />
        </Route>

	    <Route path='teams' component={Teams} onEnter={this.requireAuth.bind(this)} uid={this.props.uid} />
          <Route path='teams/create' component={TeamFormWrapper} onEnter={this.requireAuth.bind(this)} uid={this.props.uid} />
        </Route>
      </Router>
	)
  }
}

export default connect( state => {
  return {
    authStatus: state.auth.current,
    uid: state.auth.uid
  }
})(App)
