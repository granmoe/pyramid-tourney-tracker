import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import formValidation from '../FormValidation.jsx'

class RegisterForm extends React.Component {
  render() {
    const { email, password, onSubmit } = this.props
	return (
  	  <form onSubmit={onSubmit}>
        <div className='row'>
          <input type='email' placeholder='email' {...email}>
          {email.touched && email.error && <span className='error'>{email.error}</span>}
        </div>
        <div className='row'>
          <input type='displayName' placeholder='displayName' {...displayName}>
          {displayName.touched && displayName.error && <span className='error'>{displayName.error}</span>}
  	    </div>
        <div className='row'>
          <input type='password' placeholder='password' {...password}>
          {password.touched && password.error && <span className='error'>{password.error}</span>}
  	    </div>
        <input type='submit' value='Register'>
  	  </form>
	)
  }
}

const validate = values => {
  return { values, errors: { email: 'Enter an email' }}
}

const validationOptions = {
  fields: ['email', 'password', 'displayName'],
  validate: validate
}

export default formValidation(validationOptions, RegisterForm)
