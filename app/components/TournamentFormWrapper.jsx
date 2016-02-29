import React from 'react'
import { Link } from 'react-router'

export default class Tournaments extends React.Component {
  render () {
  	return <div className='tournaments'>
      <div className='tournaments__header'>
        <span><Link to='/tournaments'>Browse Tournaments</Link></span>
        &nbsp;|&nbsp;
        <span>Create New Tournament</span>
      </div>
    </div>
  }
}
