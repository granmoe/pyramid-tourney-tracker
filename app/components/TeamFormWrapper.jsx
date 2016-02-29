import React from 'react'
import { Link } from 'react-router'
import base from '../utilities/rebase-service.js'
import TeamForm from './TeamForm.jsx'

export default class TeamFormWrapper extends React.Component {
	constructor (props) {
		super(props)
	  this.state = { teams: [], profile: {}, userid: props.route.uid }
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
    var teamNames = this.state.teams.map( team => { return team.name })

		return <div className='teams'>
			<div>
				<div className='teams__header'>
          <span><Link to='/teams'>Browse Teams</Link></span>
          &nbsp;|&nbsp;
          <span>Create New Team</span>
        </div>
			</div>

      <TeamForm teamNames={teamNames} userid={this.state.userid} username={this.state.profile.displayName} />
		</div>
	}

	componentWillUnmount () {
		base.removeBinding(this.teamsStream)
	  base.removeBinding(this.profileStream)
	}
}
