import React from 'react'
import { Link } from 'react-router'

export default class InlineLink extends React.Component {
  render () {
    var separator
    if (!this.props.isLast) { separator = ' | ' }

  	return <span className='link'>
      <span><Link activeClassName='active' to={this.props.path}>{this.props.text}</Link></span>
      {separator}
    </span>
  }
}
