import React from 'react'

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
		  <UserToolbar displayName={this.props.displayName} onClickLogout={onClickLogout} />
  		</ul>
      </nav>
	)
  }
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
