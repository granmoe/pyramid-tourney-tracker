import React from 'react'
import Navbar from './Navbar.jsx'
import LinksRow from './LinksRow.jsx'

const links = [{
  text: 'Login',
  path: '/login'
}, {
  text: 'Register',
  path: '/register'
}]

const Wrapper = props => {
  const path = props.location.pathname
  const showLinks = path === '/login' || path === '/register'

  return (
    <div>
      <Navbar />
      <h1 className="main-header">Pyramid Tourney Tracker</h1>
      { showLinks && <LinksRow links={links} /> }
      {props.children}
    </div>
  )
}

export default Wrapper
