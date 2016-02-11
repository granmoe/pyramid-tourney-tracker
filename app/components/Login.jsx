import React from 'react'
import data from '../utilities/data-service.js'
import { browserHistory } from 'react-router'

export default class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = { attempts: 0, isLoggedIn: false }
	}

	componentWillMount () {
		var authData = data.root.getAuth()
		if (authData) {
			this.setState({ isLoggedIn: true, attempts: 0 })
		}

		data.root.onAuth(authData => {
			if (authData) {
				this.setState({
					isLoggedIn: true,
					attempts: 0
				})
			} else {
				this.setState({
					isLoggedIn: false,
					attempts: 0
				})
			}
		})
	}

	render() {
		var loginMethods
		var errorMessage
		var successMessage

		if (this.state.isLoggedIn === false) {
			loginMethods =
				<div className='login-method'>
					<div className='login-method__description'></div>
					<div onClick={this.login.bind(this)} className='login-method__btn-goog'></div>
				</div>

  		if (this.state.attempts > 0) {
				errorMessage = <div className='login-error-first'>Please try again</div>
			} else if (this.state.attempts > 1) {
				errorMessage = <div className='login-error-second'>You've failed twice so far</div>
			} else if (this.state.attempts > 2) {
 				errorMessage = <div className='login-error-third'>Hat trick!</div>
 			}
 		} else {
 			successMessage =
 			<div className='login-success'>
 				Success!
 			</div>
  	}

		return (
			<div className='login-form'>
			{successMessage}
			{errorMessage}
			{loginMethods}
			</div>
		)
	}

	login() {
		var attempts = this.state.attempts
		this.setState({ attempts: attempts++ })

		data.root.authWithOAuthPopup("google", (error, authData) => {
			if (!error) {
				this.setState({ isLoggedIn: true })
				console.log("Authenticated successfully with payload:", authData);
				// TODO: init user with auth data
				setTimeout( _ => browserHistory.push('/'))
			}
		})
	}
}
