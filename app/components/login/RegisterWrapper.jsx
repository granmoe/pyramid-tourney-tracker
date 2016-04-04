import React from 'react'
import RegisterFormWrapper from './RegisterFormWrapper.jsx'
import LinksRow from '../../components/LinksRow.jsx'

const RegisterWrapper = props => {
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
    <RegisterFormWrapper history={props.history} />
  </div>
}

export default RegisterWrapper
