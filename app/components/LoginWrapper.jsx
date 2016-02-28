import React from 'react'
import base from '../utilities/rebase-service.js'
import Login from './Login.jsx'

export default class App extends React.Component {
	componentWillMount () {
    this.state = { profiles: [] }

		this.profileStream = base.bindToState('profiles', {
			context: this,
			state: 'profiles',
      asArray: true
    })
	}

	componentWillUnmount() {
	  base.removeBinding(this.profileStream)
	}

  render () {
    var displayNames = this.state.profiles.map( profile => { return profile.displayName })
    return <Login displayNames={displayNames} />
  }
}
