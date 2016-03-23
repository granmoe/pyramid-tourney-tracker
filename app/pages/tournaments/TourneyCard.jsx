import React from 'react'

export default class TourneyCard extends React.Component {
  render() {
	  return <div className='tourneyCard'>
			<div className='tourneyCard__heading'>{this.props.name}</div>
			<div className='tourneyCard__description'>{this.props.description}</div>
		</div>
	}
}
