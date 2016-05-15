import React from 'react'
import formValidation from '../FormValidation.jsx'

const LoginForm = props => {
    const { email, password, onSubmit, isValid } = props

	return <form onSubmit={onSubmit}>
      <div className='row'>
        <input type='email' placeholder='email' {...email} />
        {email.touched && email.error && <span className='error'>{email.error}</span>}
      </div>
      <div className='row'>
        <input type='password' placeholder='password' {...password} />
        {password.touched && password.error && <span className='error'>{password.error}</span>}
	    </div>
      <input type='submit' value='Login' disabled={!isValid} />
    </form>
}

const validate = values => {
  let errors = {}
  let emailRegex = /^[^@]+@[^@]+$/

  if (!values.email) {
    errors.email = 'Required'
  } else if (!emailRegex.test(values.email)) {
    errors.email = 'Please enter a valid email'
  }

  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 4) {
    errors.password = 'Password must be at least 4 characters long'
  }

  return { values: values, errors: errors }
}

const validationOptions = {
  fields: ['email', 'password'],
  validate: validate
}

export default formValidation(validationOptions)(LoginForm)
