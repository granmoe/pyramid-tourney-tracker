import React from 'react'
import RegisterFormWrapper from './RegisterFormWrapper.jsx'

const RegisterWrapper = props => {
// TODO: Put the styles of login__header class on the links in wrapper.jsx

  return (
    <div className="login">
      <div className="login__header">
      </div>
      <RegisterFormWrapper history={props.history} />
    </div>
  )
}

export default RegisterWrapper
