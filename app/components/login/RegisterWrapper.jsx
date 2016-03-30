import React from 'react'
import RegisterFormWrapper from './RegisterFormWrapper.jsx'
import LinksRow from '../../components/LinksRow.jsx'

export default class RegisterWrapper extends React.Component {
  render () {
    var links = [{
      text: 'Login',
      path: '/login',
      current: false
    }, {
      text: 'Register',
      path: '/register',
      current: true
    }]

  	return (
      <div className='login'>
        <div className='login__header'>
          <LinksRow links={links} />
        </div>
        <RegisterFormWrapper />
      </div>
    )
  }
}
