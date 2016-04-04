import React from 'react'
import InlineLink from './InlineLink.jsx'
import _ from 'lodash'

const LinksRow = props => {
  return <div>
    {props.links.map( (link, idx) => {
      var last = idx === props.links.length - 1 ? true : false
      return <InlineLink key={_.uniqueId('link_')} text={link.text} path={link.path} current={link.current} isLast={last} />
    })}
  </div>
}

export default LinksRow
