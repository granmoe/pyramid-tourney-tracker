import React from 'react'
import { Link } from 'react-router'
import TourneyCard from './TourneyCard.jsx'

export default class Tournaments extends React.Component {
	constructor (props) {
		super(props)
	}

  render () {
    var tourneys

	  if (!this.props.tournaments.length) {
			tourneys = <div className='no-tourneys'>No Tournaments Found</div>
		} else {
      tourneys = this.props.tournaments.map( (tourney, key) => {
      	return <TourneyCard className='tourney-card' key={key} tourney={tourney} />
  		})
    }

  	return <div className='tournaments__tourney-list'>
      {tourneys}
    </div>
  }
}
