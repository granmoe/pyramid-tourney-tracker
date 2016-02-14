import React from 'react'
import data from '../utilities/data-service.js'
import TourneyCard from './TourneyCard.jsx'
var base = data.base

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
	  if (!this.state.tournaments.length) {
			return <div className='no-tourneys'>No Tournaments Found </div>
		}

    var tourneys = this.state.tournaments.map( (tourney, key) => {
    	return <TourneyCard className='tourney-card' key={key} tourney={tourney} />
		})

		return <div className='tourney-list'>{tourneys}</div>
  }

	componentWillUnmount () {
		base.removeBinding(this.dataStream)
	}
}
