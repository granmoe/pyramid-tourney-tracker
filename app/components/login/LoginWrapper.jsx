import React from 'react'
import LoginFormWrapper from './LoginFormWrapper.jsx'
import LinksRow from '../../components/LinksRow.jsx'

export default class LoginWrapper extends React.Component {
  render () {
    var page = this.props.location.pathname

    var links = [{
      text: 'Login',
      path: '/login',
      current: true
    }, {
      text: 'Register',
      path: '/register',
      current: false
    }]

  	return (
      <div className='login'>
        <div className='login__header'>
          <LinksRow links={links} />
        </div>
        <LoginFormWrapper />
      </div>
    )
  }
}
