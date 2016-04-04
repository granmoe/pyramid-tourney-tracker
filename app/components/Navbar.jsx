import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import UserToolbar from './UserToolbar.jsx'
import C from '../constants'
import authActions from '../actions/auth'

const Navbar = props => {
  var onClickLogout = props.actions.logoutUser

  return <nav className='navbar'>
 	<ul className='navbar__items'>
 	  <li className='navbar__item'>
        <Link className='navbar__link' to='/tournaments'>Tournaments</Link>
      </li>
	  <li className='navbar__item'>
        <Link className='navbar__link' to='/teams'>Teams</Link>
      </li>
      <UserToolbar displayName={props.displayName} onClickLogout={onClickLogout} />
	</ul>
  </nav>
}

const mapStateToProps = (state, ownProps) => {
  return {
    displayName: state.profile.displayName
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(authActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
