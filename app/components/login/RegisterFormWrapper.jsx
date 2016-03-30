import _ from 'lodash'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import C from '../../constants'
import actions from '../../actions'
import RegisterForm from './RegisterForm.jsx'

// TODO: error handling, display something when user already logged in (or just redirect?)
class RegisterFormWrapper extends React.Component {
  render() {
    return <div className='login-container'>
      <RegisterForm ref='form' onSubmit={this.register.bind(this) }/>
    </div>
  }

  register (e) {
    e.preventDefault()

    const data = this.refs.form.getFormData()

	this.props.actions.createUser(data)
    .then( userData => {
      this.props.actions.createProfile({
        uid: userData.uid,
        displayName: data.displayName
      })
    })
    .then( _ => this.login(data) )
    .catch( err => {
      console.log("Error: ", err)
    })
  }

  login(authData) {
    this.props.actions.attemptLogin(authData)
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterFormWrapper)
