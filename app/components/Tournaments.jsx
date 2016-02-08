import React from 'react'
import TourneyCard from './TourneyCard.jsx'

export default class Tournaments extends React.Component {
  render() {
	  if (!this.props.tournaments.length) {
			return <div>No Tournaments Found </div>
		}

    var tourneys = this.props.tournaments.map( (tourney, key) => {
    	return <TourneyCard key={key} tourney={tourney} />
		})

		return <div>{tourneys}</div>
  }
}
