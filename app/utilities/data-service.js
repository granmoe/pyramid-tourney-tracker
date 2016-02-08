import firebase from 'firebase'
import _ from 'lodash'

// var dbRoot = new firebase('https://pyramid-tourney-tracker.firebaseio.com/prod')
var dbRoot = new firebase('https://pyramid-tourney-tracker.firebaseio.com/test'); window['ref'] = dbRoot // DEBUGGING
var users = dbRoot.child('users')
var teams = dbRoot.child('teams')
var matches = dbRoot.child('matches')
var tournaments = dbRoot.child('tournaments')
var snapshot = {}

// Keep snapshot current
dbRoot.on('value', snapshot => {
  snapshot = snapshot.val()
  window['snap'] = snapshot
  console.log('new data', snapshot)
})

// Data API
var service = {
	root: dbRoot,
  users: users,
  teams: teams,
  matches: matches,
  tournaments: tournaments
}

service.addUser = (name, isAdmin) => {  // TODO: auth
  users.push({
    name: name,
    role: isAdmin ? 'admin' : 'user',
    tournaments: {},
    teams: {},
  	matches: {},
	  wins: 0,
  	losses: 0,
	  ties: 0,
    average: 0,
  	standing: 'none'
  })
}

service.addTeam = (teamName, users) => {
  // users = team.users schema = { ID: { name: 'bob' }, ID: { name: 'sue' }}
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

service.addMatch = matchData => {
  matches.push(matchData)
}

service.addTournament = tournamentData => {
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

service.joinTournament = teamID => {
  var team = snapshot.teams[teamID]
  var exists = !_.isEmpty(team)
  var isInTourney = !_.isEmpty(_.get(snapshot, 'tournaments.teams.'[teamId]))

  if (!exists || isInTourney) { return }
  // add team to tourney

}

window['service'] = service // DEBUGGING
export default service
