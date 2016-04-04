import React from 'react'
import { Link } from 'react-router'

const InlineLink = props => {
  var separator
  if (!props.isLast) { separator = ' | ' }

  return <span className='link'>
    <span>
      <Link activeClassName='active' to={props.path}>{props.text}</Link>
    </span>
    {separator}
  </span>
}

export default InlineLink
