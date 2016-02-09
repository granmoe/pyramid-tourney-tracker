import React from 'react'
import { Link } from 'react-router'

export default class App extends React.Component {
  render() {
		return (
      <div>
  			<h1>Pyramid Tourney Tracker</h1>
	  		<ul>
		  		<li><Link to="/tournaments">Tournaments</Link></li>
			  	<li><Link to="/register">register</Link></li>
			  	<li><Link to="/login">login</Link></li>
  			</ul>

  			{this.props.children}
      </div>
		)
  }
}
