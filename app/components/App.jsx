import React from 'react'
import data from '../utilities/data-service.js'
import Tournaments from './Tournaments.jsx'

export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.tournaments = []
		this.state = { tournaments: this.tournaments }
	}

  render() {
		return <Tournaments tournaments={this.state.tournaments} />
  }

	componentWillMount() {
		data.tournaments.on('child_added', tournament => {
			this.tournaments.push(tournament.val())
			this.setState({ tournaments: this.tournaments })
		})
	}

	componentWillUnmount() {
		data.tournaments.off()
	}
}
