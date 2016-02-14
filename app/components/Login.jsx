import React from 'react'
import data from '../utilities/data-service.js'

export default class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			attempts: 0,
			isLoggedIn: false,
			loginSelected: true,
			displayName: '',
			email: '',
			password: ''
		}
	}

	componentDidMount () {
		var authData = data.root.getAuth()
		if (authData) {
			this.setUser()
		}

		data.root.onAuth(this.onAuthCallback.bind(this))
	}

	componentWillUnmount() {
		data.root.offAuth(this.onAuthCallback.bind(this))
	}

	onAuthCallback(authData) {
  	if (authData) {
			this.setUser()
		} else {
  		this.clearUser()
		}
	}

	setUser() {
 		this.setState({
  		isLoggedIn: true,
	  	attempts: 0
	  })
	}

	clearUser() {
  	this.setState({
	  	isLoggedIn: false,
			attempts: 0
		})
	}

	onInputChange (fieldName, e) { // TODO: Add validation
		if (fieldName === 'email') {
			this.setState({ email : e.target.value })
		} else if (fieldName === 'password') {
			this.setState({ password : e.target.value })
		} else if (fieldName === 'displayName') {
			this.setState({ displayName : e.target.value })
	  }
	  console.log(e.target.value)
	}

	render() {
   	var toggleText
    var form
		var loginButton

		if (this.state.isLoggedIn === false) {
			var toggleButton =
			<div onClick={this.toggleForm.bind(this)} className="toggle-button row row-top">
				<div className={this.state.loginSelected ? "active toggle-option" : "toggle-option"}>Login</div>
				<div className={!this.state.loginSelected ? "active toggle-option" : "toggle-option"}>Register</div>
			</div>

			if (this.state.loginSelected) {
				toggleText = "Register a new account"
  			loginButton = <a href="javascript:void(0)" onClick={this.login.bind(this)} className="btn btn-login row row-bottom">Login</a>
				form =
				<div className='login-form'>
						<input className='row' name='email' onChange={this.onInputChange.bind(this, 'email')} value={this.state.email} type='email' placeholder='email' />
  					<input className='row' name='password' onChange={this.onInputChange.bind(this, 'password')} value={this.state.password} type='password' placeholder='password' />
				</div>
			} else {
				toggleText = "Login with an existing account"
	  		loginButton = <a href="javascript:void(0)" onClick={this.register.bind(this)} className="btn btn-register row row-bottom">Register</a>
				form =
				<div className='login-form'>
 					<input className='row' name='email' onChange={this.onInputChange.bind(this, 'email')} value={this.state.email} type='email' placeholder='email' />
  				<input className='row' name='password' onChange={this.onInputChange.bind(this, 'password')} value={this.state.password} type='password' placeholder='password' />
	  			<input className='row' name='displayName' onChange={this.onInputChange.bind(this, 'displayName')} value={this.state.displayName} type='text' placeholder='display name' />
				</div>
			}

  		if (this.state.attempts > 0) {
				var errorMessage = <div className='login-error-first'>Please try again</div>
			}
 		} else {
			var loggedInMessage = "You are logged in"
		}

		return (
			<div className="login-container">
				{errorMessage}
				{loggedInMessage}
   			{toggleButton}
				{form}
	  	  {loginButton}
			</div>
		)
	}

	toggleForm (e) {
	  this.setState({ loginSelected: !this.state.loginSelected })
	}

	register (e) {
		data.createUserAndLogin( this.state.email, this.state.password, this.state.displayName )
	}

	login(e) {
		var attempts = this.state.attempts
		this.setState({ attempts: attempts++ })

		data.loginUser.bind(this, { email: this.state.email, password: this.state.password })()
		  .then( _ => {
				this.setState({ isLoggedIn: true })
			})
	}
}
