import firebase from 'firebase'
import _ from 'lodash'

class service {
  constructor () {
	  this.root = new firebase('https://pyramid-tourney-tracker.firebaseio.com/test2')
// = new firebase('https://pyramid-tourney-tracker.firebaseio.com/prod')
    this.profiles = this.root.child('profiles')
// window['service'] = this
  }

  isLoggedIn () {
	  return !(this.root.getAuth() === null)
  }

  makeUserAdmin (userId) {
		// TODO: set user's role: 'admin' (can only be done by an admin)
  }

  loginUser (userObj) {
	  return this.root.authWithPassword(userObj)
  }

  createUserAndLogin (email, password, displayName) {
	  var userObj = { email: email, password: password }

    return this.root.createUser(userObj)
      .then( _ => {
        return this.root.authWithPassword(userObj)
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

  createTeam (teamName, users) {
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

  addMatch (matchData) {
    matches.push(matchData)
  }

  addTournament (tournamentData) {
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

  joinTournament (teamID) {
    var team = snapshot.teams[teamID]
    var exists = !_.isEmpty(team)
      var isInTourney = !_.isEmpty(_.get(snapshot, 'tournaments.teams.'[teamId]))

      if (!exists || isInTourney) { return }
    // add team to tourney

  }
}

var instance = new service()

export { instance as default }
