import React from 'react'
import { Link } from 'react-router'
import base from '../utilities/rebase-service.js'
import TeamCard from './TeamCard.jsx'

export default class Teams extends React.Component {
	constructor (props) {
		super(props)
		this.state = { teams: [] }
	}

	componentDidMount () {
		this.teamsStream = base.bindToState('teams', {
			context: this,
			state: 'teams',
			asArray: true
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
			<div className='teams__header'>
        <span>Browse Teams</span>
        &nbsp;|&nbsp;
        <span><Link to='/teams/create'>Create New Team</Link></span>
      </div>

			<div className='teams__list'>{teams}</div>
		</div>
	}

	componentWillUnmount () {
		base.removeBinding(this.teamsStream)
	}
}
