import React from 'react'
import dataService from '../utilities/data-service.js'
import base from '../utilities/rebase-service.js'
import TeamForm from './TeamForm.jsx'

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

		if (!this.state.teams.length) {
			teams = <div className='teams__none'>No Teams Found </div>
		} else {
			teams = this.state.teams.map( (tourney, key) => {
				return <TeamCard className='teams__card' key={key} tourney={tourney} />
			})
		}

		return <div className='teams'>
			<div>
				<div className='teams__header'>Teams</div>
			</div>
      <TeamForm userid={this.state.userid} username={this.state.profile.displayName} />
			<div className='teams__list'>{teams}</div>
		</div>
	}

	componentWillUnmount () {
		base.removeBinding(this.teamsStream)
		base.removeBinding(this.profileStream)
	}
}
