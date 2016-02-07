import React from 'react'
import Tier from './Tier.jsx'

export default class Pyramid extends React.Component {
  render() {
    var Tiers = this.props.data.tierStructure.map( (tierLength, index) => {
	  var start = index === 0 ? 0 : this.props.data.tierStructure[index - 1]
	  var teams = this.props.data.teams.slice(start, tierLength)
	  return <Tier key={tierLength} teams={teams} />
    })

    return <div className='pyramid'>
	  {Tiers}
	</div>
  }
}