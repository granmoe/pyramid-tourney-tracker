import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import store from '../store'
import actions from '../actions'

// react components
import Wrapper from './Wrapper.jsx'
import Tournaments from './Tournaments.jsx'
import TournamentsHandler from './TournamentsHandler.jsx'
import Teams from './Teams.jsx'
import TeamFormWrapper from './TeamFormWrapper.jsx'
import LoginWrapper from './LoginWrapper.jsx'

function requireAuth(nextState, replace) {
  return // TODO: implement this with redux
	if (!data.isLoggedIn()) {
		replace({
			pathname: '/login',
			state: { nextPathname: nextState.location.pathname }
		})
	}
}

var userid = null

export class App extends React.Component {
	componentWillMount() {
		store.dispatch(actions.startListeningToAuth())
	}

	render() {
		return (
			<Provider store={store}>
        <Router history={browserHistory}>
          <Route path='/' component={Wrapper}>
		        <Route path='tournaments' component={TournamentsHandler} onEnter={requireAuth}>
  	          <Route path='create' component={Tournaments} />
  	          <Route path='browse' component={Tournaments} />
            </Route>

		        <Route path='login' component={LoginWrapper} />

		        <Route path='teams' component={Teams} onEnter={requireAuth} uid={userid} />
            <Route path='teams/create' component={TeamFormWrapper} onEnter={requireAuth} uid={userid} />
          </Route>
        </Router>
      </Provider>
		)
	}
}

// 				<Router>
// 					<Route path="/" component={Wrapper}>
// 						<IndexRoute component={Articles} />
// 					</Route>
// 				</Router>
// var userid
//
// data.root.onAuth( authData => {
//   if (authData) {
//     userid = authData.uid
//   } else {
//     userid = null
//   }
// })
