import _ from 'lodash'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import C from '../../constants'
import actions from '../../actions'
import LoginForm from './LoginForm.jsx'
import RegisterForm from './LoginForm.jsx'

class Login extends React.Component {
  constructor(props) {
	super(props)
	  this.state = {
		attempts: 0
	  }
  }

  render() {
    var form

    if (this.state.loginSelected) {
      form = <LoginForm test="test"/>
    } else {
      form = <LoginForm test="test"/>
     /* form = <RegisterForm /> */
    }

    return (
      <div className='login-container'>
        {form}
      </div>
    )
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
