import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import TourneyCard from './TourneyCard.jsx'

class Tournaments extends React.Component {
  render () {
    var tournamentKeys = Object.keys(this.props.tournaments)

    return (
      <div className='tournaments__tourney-list'>
        {tournamentKeys.length ?
          tournamentKeys.map( key => {
            return <TourneyCard className='tourney-card' key={key} {...this.props.tournaments[key]} />
          })
        :
          <div className='no-tourneys'>There are no tournaments yet. Maybe you should create one?</div>
        }
      </div>
    )
  }
}

export default connect ( state => {
  return {
    tournaments: state.tournaments
  }
})(Tournaments)
