import React from 'react'
import { Link } from 'react-router'

export default class InlineLink extends React.Component {
  render () {
  	return (
      <span>
        {this.props.current ?
          {this.props.text}
        :
          <Link to={this.props.link}>{this.props.text}</Link>
        }
      </span>
    )
  }
}
