import React from 'react'
import { Link } from 'react-router'
import Navbar from './Navbar.jsx'

export default class Wrapper extends React.Component {
	constructor (props) {
    super(props)
    this.state = { uid: null }
  }

  render() {
		return (
			<div>
        <Navbar />
 			  <h1 className='main-header'>Pyramid Tourney Tracker</h1>
 			  {this.props.children}
			</div>
		)
  }
}
