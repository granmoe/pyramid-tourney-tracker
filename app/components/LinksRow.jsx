import React from 'react'
import InlineLink from './InlineLink.jsx'
import _ from 'lodash'

export default class LinksRow extends React.Component {
  render () {
  	return (
      <div>
        {this.props.links.map( (link, idx) => {
          var last = idx === this.props.links.length - 1 ? true : false
          return <InlineLink key={_.uniqueId('link_')} text={link.text} path={link.path} current={link.current} isLast={last} />
        })}
      </div>
    )
  }
}
