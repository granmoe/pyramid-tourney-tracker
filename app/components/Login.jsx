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
			password: '',
			errorMessage: '',
      isDuplicate: false
		}
	}

	componentDidMount () {
		var authData = data.root.getAuth()
		if (authData) {
			this.setUser()
		}

		this.authRef = this.onAuthCallback.bind(this)
		data.root.onAuth(this.authRef)
	}

	componentWillUnmount() {
		data.root.offAuth(this.authRef)
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
      this.checkForDuplicates(e.target.value)
	  }
	}

  checkForDuplicates (name) {
    if (_.includes(this.props.displayNames, name)) {
      this.setState({ isDuplicate: true })
    } else {
      this.setState({ isDuplicate: false })
    }
  }

	render() {
   	var toggleText
    var form
		var loginButton
    var duplicateErrorMessage
    var isDisabled

		if (this.state.isLoggedIn === false) {
			var toggleButton =
			<div onClick={this.toggleForm.bind(this)} className="toggle-button row row-top">
				<div className={this.state.loginSelected ? "active toggle-option" : "toggle-option"}>Login</div>
				<div className={!this.state.loginSelected ? "active toggle-option" : "toggle-option"}>Register</div>
			</div>

			if (this.state.loginSelected) {
				toggleText = "Register a new account"
        isDisabled = (!this.state.email || !this.state.password)
  			loginButton = <button onClick={this.login.bind(this)} className="btn btn-login row row-bottom" disabled={isDisabled}>Login</button>

				form =
				<div className='login-form'>
						<input className='row' name='email' onChange={this.onInputChange.bind(this, 'email')} value={this.state.email} type='email' placeholder='email' />
  					<input className='row' name='password' onChange={this.onInputChange.bind(this, 'password')} value={this.state.password} type='password' placeholder='password' />
				</div>
			} else {
        if (this.state.isDuplicate) {
          duplicateErrorMessage = <div>Sorry, that display name is already taken! Keep trying...<br /><br /></div>
        }

        isDisabled = (!this.state.email || !this.state.password || !this.state.displayName || this.state.isDuplicate)
				toggleText = "Login with an existing account"
	  		loginButton = <button onClick={this.register.bind(this)} className="btn btn-register row row-bottom" disabled={isDisabled}>Register</button>

				form =
				<div className='login-form'>
 					<input className='row' name='email' onChange={this.onInputChange.bind(this, 'email')} value={this.state.email} type='email' placeholder='email' />
  				<input className='row' name='password' onChange={this.onInputChange.bind(this, 'password')} value={this.state.password} type='password' placeholder='password' />
	  			<input className='row' name='displayName' onChange={this.onInputChange.bind(this, 'displayName')} value={this.state.displayName} type='text' placeholder='display name' />
				</div>
			}

  		if (this.state.errorMessage) {
				var errorMessage = <div className='login-error'>{this.state.errorMessage}</div>
			}
 		} else {
			var loggedInMessage = "You are logged in"
		}

		return (
			<div className="login-container">
				{errorMessage}
        {duplicateErrorMessage}
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

		data.loginUser({ email: this.state.email, password: this.state.password })
		  .then( _ => {
				this.setState({ isLoggedIn: true, errorMessage: '' })
			})
  		.catch( err => {
  	    this.setState({ errorMessage: err.message || 'Sorry, there was an error. Please try again.' })
		  })
	}
}
