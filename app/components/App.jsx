import React from 'react'
import { Link } from 'react-router'

export default class App extends React.Component {
  render() {
		return (
			<div>
      <nav className='navbar'>
	  		<ul className='navbar__items'>
		  			<li className='navbar__item'>
								<Link className='navbar__link' to='/tournaments'>Tournaments</Link>
						</li>
			  		<li className='navbar__item'>
								<Link className='navbar__link' to='/login'>Login</Link>
						</li>
  			</ul>
      </nav>

 			<h1 className='main-header'>Pyramid Tourney Tracker</h1>

 			{this.props.children}
			</div>
		)
  }
}
