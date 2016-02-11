import React from 'react'
import { Link } from 'react-router'
import data from '../utilities/data-service.js'

export default class App extends React.Component {
	componentWillMount () {
		this.resetUser()

  	var authData = data.root.getAuth()
		if (authData) {
			this.setState({
				isLoggedIn: true,
				displayName: authData.google.displayName,
				profileImageURL: authData.google.profileImageURL
			})
		}


		data.root.onAuth(authData => {
			if (authData) {
				this.setState({
					displayName: authData.google.displayName,
					isLoggedIn: true,
					profileImageURL: authData.google.profileImageURL
				})
			} else {
				this.resetUser()
			}
		})
	}

	resetUser() {
		this.setState({ displayName: 'guest', isLoggedIn: false, profileImageURL: null })
	}

	logout() {
		data.root.unauth()
	}

  render() {
		return (
			<div>
      <nav className='navbar'>
	  		<ul className='navbar__items'>
	  			<li className='navbar__item'>
						<Link className='navbar__link' to='/tournaments'>Tournaments</Link>
					</li>
   				{this.state.isLoggedIn ? (
 					<li className='navbar__item navbar__text'>
						<div className='navbar__display-name'>
  						<span>Logged in as </span>
  	  				<span>{this.state.displayName}</span>
							&nbsp;
							<a href='#' onClick={this.logout.bind(this)}>(logout)</a>
						</div>
  					<img className='navbar__profile-pic' src={this.state.profileImageURL}></img>
					</li>
					) : (
					<li className='navbar__item'>
						<Link className='navbar__link' to='/login'>Login</Link>
  	  		</li>
					)}
  		  </ul>
      </nav>

 			<h1 className='main-header'>Pyramid Tourney Tracker</h1>

 			{this.props.children}
			</div>
		)
  }
}
