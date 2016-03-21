import React from 'react'

export default class TeamCard extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    var users = Object.keys(this.props.users).map( key => {
      var user = this.props.users[key]
      return <span key={key} className='team-card__user'>{user.displayName} </span>
    })

    return <div className='team-card'>
      <h1>{this.props.name}</h1>
      <p>{users}</p>
      <p>Overall Standing: {this.props.standing}</p>
      <p>Wins: {this.props.wins}</p>
      <p>Losses: {this.props.losses}</p>
      <p>Ties: {this.props.ties}</p>
    </div>
  }
}
