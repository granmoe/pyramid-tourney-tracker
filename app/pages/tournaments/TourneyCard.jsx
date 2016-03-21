import React from 'react'
import data from '../utilities/data-service.js'

export default class TourneyCard extends React.Component {
  render() {
	  return <div className='tourneyCard'>
			<div className='tourneyCard__heading'>{this.props.tourney.name}</div>
			<div className='tourneyCard__description'>{this.props.tourney.description}</div>
		</div>
	}
}
