import firebase from 'firebase'
import _ from 'lodash'
import rebase from 're-base'

// var root = new firebase('https://pyramid-tourney-tracker.firebaseio.com/prod')
var root = new firebase('https://pyramid-tourney-tracker.firebaseio.com/test2'); window['ref'] = root // DEBUGGING
var base = rebase.createClass('https://pyramid-tourney-tracker.firebaseio.com/test2')

var service = {
	root: root
}

service.isLoggedIn = function () {
	return !(root.getAuth() === null)
}

service.makeUserAdmin = function (userId) {
		// TODO: set user's role: 'admin' (can only be done by an admin)
}

service.loginUser = function (userObj) {
	return root.authWithPassword(userObj)
}

service.createUserAndLogin = function (email, password, displayName) {
	var userObj = { email: email, password: password }

  return root.createUser(userObj)
    .then( _ => {
			return root.authWithPassword(userObj)
	  })
    .catch( error => { return error })
	  .then(function (authData) {
			profiles.child(authData.uid).set({
				displayName: displayName,
				role: 'user',
				tournaments: {},
				teams: {},
				matches: {},
				wins: 0,
				losses: 0,
				ties: 0,
				average: 0,
				standing: 'none'
			})
		})
		.catch( error => {
			return error
		})
}

service.addTeam = function (teamName, users) {
  // users arg = team.users schema = { ID: { name: 'bob' }, ID: { name: 'sue' }}
  teams.push({
		name: teamName,
    users: users,
    matches: {},
  	tournaments: {},
  	wins: 0,
  	losses: 0,
  	ties: 0,
  	average: 0,
  	standing: 'none'
  })
}

service.addMatch = function(matchData) {
  matches.push(matchData)
}

service.addTournament = function (tournamentData) {
// name, description, rules

  var defaults = {
	  // created: string ('mm/dd/yyyy'),
  	matches: {},
	  tierStructure: { 0: 1, 1: 3, 2: 5, 3: 8, 4: 12, 5: 20 },
  	teams: {}
  }

  var data = _.extend(defaults, tournamentData)
  tournaments.push(data)
}

service.joinTournament = function (teamID) {
  var team = snapshot.teams[teamID]
  var exists = !_.isEmpty(team)
  var isInTourney = !_.isEmpty(_.get(snapshot, 'tournaments.teams.'[teamId]))

  if (!exists || isInTourney) { return }
  // add team to tourney

}

window['service'] = service // DEBUGGING
export { service as default, base }
