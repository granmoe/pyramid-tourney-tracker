import React from 'react'
import { Link } from 'react-router'

export default class UserToolbar extends React.Component {
  render () {
    var toolbar

    if (this.props.displayName) {
      toolbar = <div className='navbar__display-name'>
		Logged in as {this.props.displayName}
		&nbsp;
		<a href='javascript:void(0)' onClick={this.props.onClickLogout}>(logout)</a>
	  </div>
    } else {
      toolbar = <Link className='navbar__link' to='/login'>Login</Link>
    }

  	return (
	  <li className='navbar__item navbar__text'>
        {toolbar}
	  </li>
	)
  }
}
