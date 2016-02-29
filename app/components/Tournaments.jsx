import React from 'react'
import { Link } from 'react-router'
import base from '../utilities/rebase-service.js'
import TourneyCard from './TourneyCard.jsx'

export default class Tournaments extends React.Component {
	constructor (props) {
		super(props)
		this.state = { tournaments: [] }
	}

	componentDidMount () {
		this.dataStream = base.bindToState('tournaments', {
			context: this,
			state: 'tournaments',
			asArray: true
		})
	}

  render () {
    var tourneys

	  if (!this.state.tournaments.length) {
			tourneys = <div className='no-tourneys'>No Tournaments Found</div>
		} else {
      tourneys = this.state.tournaments.map( (tourney, key) => {
      	return <TourneyCard className='tourney-card' key={key} tourney={tourney} />
  		})
    }

  	return <div className='tournaments'>
      <div className='tournaments__header'>
        <span>Browse Tournaments</span>
        &nbsp;|&nbsp;
        <span><Link to='/tournaments/create'>Create New Tournament</Link></span>
      </div>
      <div className='tournaments__tourney-list'>
        {tourneys}
      </div>
    </div>
  }

	componentWillUnmount () {
		base.removeBinding(this.dataStream)
	}
}
