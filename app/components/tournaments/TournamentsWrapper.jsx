import React from 'react'
import LinksRow from '../../components/LinksRow.jsx'

export default class TournamentsWrapper extends React.Component {
  render () {
    var page = this.props.location.pathname

    var links = [{
      text: 'Create',
      path: '/tournaments/create',
      current: page === '/tournaments/create'
    }, {
      text: 'Browse',
      path: '/tournaments/all',
      current: page === '/tournaments/all'
    }]
// TODO: Determine current page in the actual link component
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
