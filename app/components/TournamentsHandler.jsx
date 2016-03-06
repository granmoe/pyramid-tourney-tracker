import React from 'react'
import { Link } from 'react-router'
import base from '../utilities/rebase-service.js'

export default class TournamentsHandler extends React.Component {
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
    // TODO: move this header to a separate component
  	return <div className='tournaments'>
      <div className='tournaments__header'>
        <span><Link to='/tournaments/browse'>Browse Tournaments</Link></span>
        &nbsp;|&nbsp;
        <span>Create New Tournament</span>
      </div>
    </div>

    {React.cloneElement(this.props.children, {
      tournaments: this.state.tournaments
    })}
  }

	componentWillUnmount () {
		base.removeBinding(this.dataStream)
	}
}
