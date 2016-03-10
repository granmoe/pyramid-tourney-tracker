import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import UserToolbar from './UserToolbar.jsx'

class Navbar extends React.Component {
  render() {
		return (
      <nav className='navbar'>
	  		<ul className='navbar__items'>
	  			<li className='navbar__item'>
						<Link className='navbar__link' to='/tournaments'>Tournaments</Link>
					</li>
	  			<li className='navbar__item'>
							<Link className='navbar__link' to='/teams'>Teams</Link>
					</li>
					<UserToolbar username={this.props.username} onClickLogout={this.props.onClickLogout} />
  		  </ul>
      </nav>
		)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    username: state.auth.username
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickLogout: _ => {
      dispatch({ type: C.LOGOUT })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
