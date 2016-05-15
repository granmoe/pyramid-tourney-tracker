import React from 'react'
import formValidation from '../FormValidation.jsx'

// TODO: check for duplicate display names
const RegisterForm = props => {
  const { email, password, displayName, isValid, onSubmit } = props
  return (
  	<form onSubmit={onSubmit}>
      <div className='row'>
        <input type='email' placeholder='email' {...email} />
        {email.touched && email.error && <span className='error'>{email.error}</span>}
      </div>
      <div className='row'>
        <input type='displayName' placeholder='display name' {...displayName} />
        {displayName.touched && displayName.error && <span className='error'>{displayName.error}</span>}
  	  </div>
      <div className='row'>
        <input type='password' placeholder='password' {...password} />
        {password.touched && password.error && <span className='error'>{password.error}</span>}
  	  </div>
      <input type='submit' value='Register' disabled={!isValid} />
  	</form>
  )
}

const validate = values => {
  let errors = {}
  let emailRegex = /^[^@]+@[^@]+$/

  if (!values.email) {
    errors.email = 'Required'
  } else if (!emailRegex.test(values.email)) {
    errors.email = 'Please enter a valid email'
  }

  if (!values.displayName) {
    errors.displayName = 'Required'
  }

  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long'
  }

  return { values: values, errors: errors }
}

const validationOptions = {
  fields: ['email', 'password', 'displayName'],
  validate: validate
}

export default formValidation(validationOptions)(RegisterForm)
