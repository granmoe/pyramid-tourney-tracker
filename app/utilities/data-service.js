import firebase from 'firebase'
import _ from 'lodash'

// var dbRoot = new firebase('https://pyramid-tourney-tracker.firebaseio.com/prod')
var dbRoot = new firebase('https://pyramid-tourney-tracker.firebaseio.com/test'); window['ref'] = dbRoot
var users = dbRoot.child('users')
var teams = dbRoot.child('teams')
var matches = dbRoot.child('matches')
var tournaments = dbRoot.child('tournaments')
var snapshot = {}

// Keep snapshot current
dbRoot.on('value', snapshot => {
  snapshot = snapshot.val()
})

// Data API
var service = {}

service.addUser = function (userData) {
  users.push(userData)
  // TODO: auth
}

service.addTeam = function (teamData) {
  teams.push(teamData)
}

service.addMatch = function (matchData) {
  matches.push(matchData)
}

service.addTournament = function (tournamentData) {
  tournaments.push(tournamentData)
}

service.joinTournament = function (teamID) {
  var team = snapshot.teams[teamID]
  var exists = !_.isEmpty(team)
  var isInTourney = tournaments.child('teams')[teamID]

  if (!exists || isInTourney) { return }
  // add team to tourney

}

export default service