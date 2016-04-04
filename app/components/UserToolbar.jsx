import React from 'react'
import { Link } from 'react-router'

const UserToolbar = props => {
  var toolbar

  if (props.displayName) {
    toolbar = <div className='navbar__display-name'>
      Logged in as {props.displayName}
      &nbsp;
      <a href='javascript:void(0)' onClick={props.onClickLogout}>(logout)</a>
    </div>
  } else {
    toolbar = <Link className='navbar__link' to='/login'>Login</Link>
  }

  return <li className='navbar__item navbar__text'>
    {toolbar}
  </li>
}

export default UserToolbar
