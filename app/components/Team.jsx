import React from 'react'

export default class Team extends React.Component {
  render() {
    return <div className='pyramid__team'>
	  <div className='team__name'>{this.props.data.name}</div>
	  <div className='team__average'>{this.props.data.average}</div>
	</div>
  }
}