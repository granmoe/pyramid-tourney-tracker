import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import formValidation from '../FormValidation.jsx'

class LoginForm extends React.Component {
  render() {
    const { email, password } = this.props
	return (
  	  <div>
        <div className='row'>
          <input type='email' placeholder='email' {...email} />
          {email.touched && email.error && <span className='error'>{email.error}</span>}
        </div>
        <div className='row'>
          <input type='password' placeholder='password' {...password} />
          {password.touched && password.error && <span className='error'>{password.error}</span>}
  	    </div>
  	  </div>
	)
  }
}

const validate = values => {
  return { values, errors: { email: 'Enter an email' }}
}

const validationOptions = {
  fields: ['email', 'password'],
  validate: validate
}

export default formValidation(validationOptions, LoginForm)