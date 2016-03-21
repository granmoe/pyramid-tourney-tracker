import _ from 'lodash'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import C from '../../constants'
import actions from '../../actions'

class Login extends React.Component {
  constructor(props) {
	super(props)
	  this.state = {
		attempts: 0,
		loginSelected: true,
		email: '',
		password: '',
		displayName: '',
        isDuplicate: false
	  }
  }

  onInputChange (fieldName, e) { // TODO: Add validation, break these into separate components
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

	if (this.props.isLoggedIn === false) {
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

        toggleText = "Login with an existing account"
        isDisabled = (!this.state.email || !this.state.password || !this.state.displayName || this.state.isDuplicate)
        loginButton = <button onClick={this.register.bind(this)} className="btn btn-register row row-bottom" disabled={isDisabled}>Register</button>

        form =
        <div className='login-form'>
          <input className='row' name='email' onChange={this.onInputChange.bind(this, 'email')} value={this.state.email} type='email' placeholder='email' />
          <input className='row' name='password' onChange={this.onInputChange.bind(this, 'password')} value={this.state.password} type='password' placeholder='password' />
          <input className='row' name='displayName' onChange={this.onInputChange.bind(this, 'displayName')} value={this.state.displayName} type='text' placeholder='display name' />
        </div>
      }

  	  if (this.props.loginErrorMessage) {
		var errorMessage = <div className='login-error'>{this.props.loginErrorMessage}</div>
 	  }
    } else {
      var loggedInMessage = <div className='login-error'>You are logged in</div>
    }

    return (
      <div className="login-container">
    	{errorMessage}
        {loggedInMessage}
        {duplicateErrorMessage}
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
	this.props.actions.createUser({
      email: this.state.email,
      password: this.state.password,
      displayName: this.state.displayName
    })
    .then( userData => {
      this.props.actions.createProfile({
        uid: userData.uid,
        displayName: this.state.displayName
      })
    })
    .then( _ => this.login() )
    .catch( err => {
      console.log("Error: ", err)
    })
  }

  login(e) {
	var attempts = this.state.attempts
	this.setState({ attempts: attempts++ })

    this.props.actions.attemptLogin({
      email: this.state.email,
      password: this.state.password,
    })
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.current === C.LOGGED_IN,
    loginErrorMessage: state.auth.loginErrorMessage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
