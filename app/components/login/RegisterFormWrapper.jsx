import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import C from '../../constants'
import actions from '../../actions'
import RegisterForm from './RegisterForm.jsx'

class RegisterFormWrapper extends React.Component {
  render () {
    return (
      <div className="login-container">
        {this.props.registerErrorMessage && <div className="error">Registration failed! {this.props.registerErrorMessage}</div>}
        <RegisterForm ref="form" onSubmit={this.register.bind(this) }/>
      </div>
    )
  }

  register (e) {
    e.preventDefault()

    const data = this.refs.form.getFormData()

    this.props.actions.createUser(data)
    .then(userData => {
      this.props.actions.createProfile({
        uid: userData.uid,
        displayName: data.displayName
      })
    })
    .then(_ => this.login(data))
    .catch(error => {
      this.props.actions.registerError(error.message)
    })
  }

  login (authData) {
    this.props.actions.attemptLogin(authData)
    .then(_ => {
      this.props.history.push('/')
    })
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.current === C.LOGGED_IN,
    isAwaitingAuthResponse: state.auth.current === C.AWAITING_AUTH_RESPONSE,
    registerErrorMessage: state.auth.registerErrorMessage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterFormWrapper)
