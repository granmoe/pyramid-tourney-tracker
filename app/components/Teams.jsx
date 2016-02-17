import React from 'react'
import data from '../utilities/data-service.js'
var base = data.base

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

		return <div className='teams'>
			<div>
				<div className='teams__header'>Teams</div>
				{this.state.formOpen ? (
					<div>
					<div onClick={this.onClickCreate.bind(this)} className='teams__create-button'>Create New Team</div>
					<i className='material-icons'>remove</i>
  				<form className='teams__create-form'>
					  The form will go here
					</form>
					</div>
				) : (
					<div>
					<div onClick={this.onClickCreate.bind(this)} className='teams__create-button'>Create New Team</div>
					<i className='material-icons'>add</i>
					</div>
				)}
			</div>
			<div className='teams__list'>{teams}</div>
		</div>
	}

	onClickCreate (e) {
		e.preventDefault()
		this.setState({ formOpen: !this.state.formOpen })
	}

	componentWillUnmount () {
		base.removeBinding(this.dataStream)
	}
}
