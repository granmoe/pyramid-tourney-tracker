import _ from 'lodash'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import C from '../../constants'
import actions from '../../actions'
import LoginForm from './LoginForm.jsx'

// TODO: error handling, display something when user already logged in (or just redirect?)
class LoginFormWrapper extends React.Component {
  render() {
    return <div className='login-container'>
      <LoginForm ref='form' onSubmit={this.login.bind(this)} />
    </div>
  }

  login(e) {
    e.preventDefault()

	var attempts = this.state.attempts
	this.setState({ attempts: attempts++ })

    this.props.actions.attemptLogin(this.refs.form.getFormData())
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormWrapper)
