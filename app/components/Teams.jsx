import React from 'react'
import dataService from '../utilities/data-service.js'
import base from '../utilities/rebase-service.js'
import TeamForm from './TeamForm.jsx'
import TeamCard from './TeamCard.jsx'

export default class Teams extends React.Component {
	constructor (props) {
		super(props)
		this.state = { teams: [], profile: {}, formOpen: false, userid: props.route.uid, username: '' }
	}

	componentDidMount () {
		this.teamsStream = base.bindToState('teams', {
			context: this,
			state: 'teams',
			asArray: true
		})

    this.profileStream = base.bindToState('profiles/' + this.state.userid, {
		  context: this,
		  state: 'profile'
	  })
	}

	render () {
		var teams
    var teamNames = this.state.teams.map( team => { return team.name })

		if (!this.state.teams.length) {
			teams = <div className='teams__none'>No Teams Found </div>
		} else {
			teams = this.state.teams.map( (team, key) => {
				return <TeamCard key={key} {...team} />
			})
		}

		return <div className='teams'>
			<div>
				<div className='teams__header'>Teams</div>
			</div>
      <TeamForm teamNames={teamNames} userid={this.state.userid} username={this.state.profile.displayName} />
			<div className='teams__list'>{teams}</div>
		</div>
	}

	componentWillUnmount () {
		base.removeBinding(this.teamsStream)
		base.removeBinding(this.profileStream)
	}
}
