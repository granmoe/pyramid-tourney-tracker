import React from 'react'
import RegisterFormWrapper from './RegisterFormWrapper.jsx'
import LinksRow from '../../components/LinksRow.jsx'

export default class RegisterWrapper extends React.Component {
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
        <RegisterFormWrapper history={this.props.history} />
      </div>
    )
  }
}

