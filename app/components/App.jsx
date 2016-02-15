import React from 'react'
import { Link } from 'react-router'
import data from '../utilities/data-service'
import UserToolbar from './UserToolbar.jsx'

export default class App extends React.Component {
	componentWillMount () {
    this.state = { uid: null}

  	var authData = data.root.getAuth()

		if (authData) {
			this.state = { uid: authData.uid }
		}

		this.onAuthRef = this.onAuthCallback.bind(this)
		data.root.onAuth(this.onAuthRef)
	}

	componentWillUnmount() {
  	data.root.offAuth(this.onAuthRef)
	}

	onAuthCallback(authData) {
		if (authData) {
			this.setState({ uid: authData.uid })
		} else {
  		this.setState({ uid: null })
		}
	}

  render() {
		return (
			<div>
      <nav className='navbar'>
	  		<ul className='navbar__items'>
	  			<li className='navbar__item'>
						<Link className='navbar__link' to='/tournaments'>Tournaments</Link>
					</li>
   				{this.state.uid ? (
						<UserToolbar uid={this.state.uid} />
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
