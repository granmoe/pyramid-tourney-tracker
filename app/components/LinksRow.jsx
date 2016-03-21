import React from 'react'
import InlineLink from './InlineLink.jsx'

export default class LinksRow extends React.Component {
  render () {
  	return (
      {this.props.links.map( link => {
        return <InlineLink text={link.text} path={link.path} current={link.current} />
      })}
    )
  }
}
