import React from 'react'
import LoginFormWrapper from './LoginFormWrapper.jsx'

const LoginWrapper = props => {
  return (
    <div className="login">
      <div className="login__header"></div>
      <LoginFormWrapper history={props.history} />
    </div>
  )
}

export default LoginWrapper
