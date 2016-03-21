import React from 'react'
import LinksRow from '../../components/LinksRow.jsx'

export default class TournamentsWrapper extends React.Component {
  render () {
    var links = [{
      text: 'Create',
      path: '/tournaments/create',
      current: true
    }, {
      text: 'Browse',
      path: '/tournaments/browse',
      current: false
    }]

  	return (
      <div className='tournaments'>
        <div className='tournaments__header'>
          <LinksRow links={links} />
        </div>
        {this.props.children}
      </div>
    )
  }
}
