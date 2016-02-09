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
			return <div>No Tournaments Found </div>
		}

    var tourneys = this.state.tournaments.map( (tourney, key) => {
    	return <TourneyCard key={key} tourney={tourney} />
		})

		return <div>{tourneys}</div>
  }

	componentWillUnmount() {
		data.tournaments.off()
	}
}
