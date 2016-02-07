import React from 'react'
import Team from './Team.jsx'

export default class Tier extends React.Component {
  render() {
    var Teams = this.props.teams.map( team => {
	  return <Team key={team.id} data={team} />
    })

    return <div className='pyramid__tier'>
	  {Teams}
	</div>
  }
}