import React from 'react'
import LoginFormWrapper from './LoginFormWrapper.jsx'
import LinksRow from '../../components/LinksRow.jsx'

export default class LoginWrapper extends React.Component {
  render () {
    var links = [{
      text: 'Login',
      path: '/login'
    }, {
      text: 'Register',
      path: '/register'
    }]

  	return (
      <div className='login'>
        <div className='login__header'>
          <LinksRow links={links} />
        </div>
        <LoginFormWrapper history={this.props.history} />
      </div>
    )
  }
}
