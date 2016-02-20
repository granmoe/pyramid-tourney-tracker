import React from 'react'
import { base } from '../utilities/data-service.js'
import TeamForm from './TeamForm.jsx'

export default class Teams extends React.Component {
	constructor (props) {
		super(props)
		this.state = { teams: [], formOpen: false }
	}

	componentDidMount () {
		this.dataStream = base.bindToState('teams', {
			context: this,
			state: 'teams',
			asArray: true
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

// TODO: make a form component that can be used for any form
		return <div className='teams'>
			<div>
				<div className='teams__header'>Teams</div>
			</div>
      <TeamForm />
			<div className='teams__list'>{teams}</div>
		</div>
	}

	componentWillUnmount () {
		base.removeBinding(this.dataStream)
	}
}
