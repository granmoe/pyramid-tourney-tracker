import React from 'react'
import LoginFormWrapper from './LoginFormWrapper.jsx'
import LinksRow from '../../components/LinksRow.jsx'

const LoginWrapper = props => {
  var links = [{
    text: 'Login',
    path: '/login'
  }, {
    text: 'Register',
    path: '/register'
  }]

  return <div className='login'>
    <div className='login__header'>
      <LinksRow links={links} />
    </div>
    <LoginFormWrapper history={props.history} />
  </div>
}

export default LoginWrapper
