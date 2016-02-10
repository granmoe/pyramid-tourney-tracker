import React from 'react'
import data from '../utilities/data-service.js'
import TourneyCard from './TourneyCard.jsx'

export default class Tournaments extends React.Component {
	constructor(props) {
		super(props)
		this.tournaments = []
		this.state = { tournaments: this.tournaments }
	}

	componentWillMount() {
		data.tournaments.on('child_added', tournament => {
  		this.tournaments.push(tournament.val())
	  	this.setState({ tournaments: this.tournaments })
		})
	}

  render() {
	  if (!this.state.tournaments.length) {
			return <div className='no-tourneys'>No Tournaments Found </div>
		}

    var tourneys = this.state.tournaments.map( (tourney, key) => {
    	return <TourneyCard className='tourney-card' key={key} tourney={tourney} />
		})

		return <div className='tourney-list'>{tourneys}</div>
  }

	componentWillUnmount() {
		data.tournaments.off()
	}
}
