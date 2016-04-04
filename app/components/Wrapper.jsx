import React from 'react'
import Navbar from './Navbar.jsx'

const Wrapper = props => {
  return <div>
    <Navbar />
	<h1 className='main-header'>Pyramid Tourney Tracker</h1>
	{props.children}
  </div>
}

export default Wrapper
