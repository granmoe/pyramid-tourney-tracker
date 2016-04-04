import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import C from '../../constants'
import actions from '../../actions'
import LoginForm from './LoginForm.jsx'

class LoginFormWrapper extends React.Component {
  render() {
    return <div className='login-container'>
      {this.props.loginErrorMessage && <div className='error'>Login failed! {this.props.loginErrorMessage}</div>}
      <LoginForm ref='form' onSubmit={this.login.bind(this)} />
    </div>
  }

  login(e) {
    e.preventDefault()

    this.props.actions.attemptLogin(this.refs.form.getFormData())
     .then( authData => {
       this.props.history.push('/')
     })
     .catch( error => {
       this.props.actions.loginError(error.message)
     })
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.current === C.LOGGED_IN,
    isAwaitingAuthResponse: state.auth.current === C.AWAITING_AUTH_RESPONSE,
    loginErrorMessage: state.auth.loginErrorMessage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormWrapper)
