import React from 'react'
import data from '../utilities/data-service.js'
var base = data.base

export default class Teams extends React.Component {
	constructor (props) {
		super(props)
		this.state = { teams: [] }
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

		return <div className='teams'>
			<div>
				<div className='teams__header'>Teams</div>
				<div className='teams__create-button'><span>+</span> Create New Team</div>
			</div>
			<div className='teams__list'>{teams}</div>
		</div>
	}

	componentWillUnmount () {
		base.removeBinding(this.dataStream)
	}
}
