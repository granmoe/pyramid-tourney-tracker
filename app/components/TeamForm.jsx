import React from 'react'
import base from '../utilities/rebase-service.js'

export default class TeamForm extends React.Component {
	constructor (props) {
		super(props)
	  this.state = { profiles: [], formOpen: false }
	}

	componentDidMount () {
		this.dataStream = base.bindToState('profiles', {
			context: this,
			state: 'profiles',
      teamName: '',
      teamMateId: '',
			asArray: true
		})
	}

	componentWillUnmount () {
		base.removeBinding(this.dataStream)
	}

	onClickCreate (e) {
		e.preventDefault()
	  this.setState({ formOpen: !this.state.formOpen })
	}

  render () {
    var formFields
    var collapseIcon
    var options
    var submitButton
    var isDisabled

    if (this.state.formOpen) {
      collapseIcon = 'remove'

      options = this.state.profiles.map( profile => {
        return <option key={profile.key} data-username={profile.displayName} value={profile.key}>{profile.displayName}</option>
      })

      if (!this.state.teamName || !this.state.teamMateId) { isDisabled = true }
      formFields = <div>
	  			<input className='teams__team-name' name='teamName' onChange={this.onInputChange.bind(this, 'teamName')} value={this.state.teamName} type='text' placeholder='team name' />
          <select className='teams__select-user' onChange={this.onSelectChange.bind(this)}>
            <option key='none' value=''>None Selected</option>
            {options}
          </select>
        </div>

        submitButton = <button onClick={this.createTeam.bind(this)} className='teams__create-team' disabled={isDisabled}>Create Team</button>
    } else {
      collapseIcon = 'add'
    }

    return (
 			<form className='teams__create-form'>
				<div onClick={this.onClickCreate.bind(this)} className='teams__collapse-button'>
					<span>Create New Team</span>
					<i className='material-icons teams__collapse-icon'>{collapseIcon}</i>
				</div>
        {formFields}
        {submitButton}
			</form>
    )
  }

  createTeam () {
    var users = {}
//      this.props.uid: { name: this.props.username },
 //     this.state.teamMateId: { name: this.state.teamMateName }
  //  }

//    dataService.createTeam(this.state.teamName, users)
  }

  onSelectChange (e) {
    var selected = e.target.options[e.target.selectedIndex]
    var teamMateId = selected.value
    var teamMateName = selected.dataset.username

    if (!teamMateId || !teamMateName) { return }
    this.setState({
      teamMateId: teamMateId,
      teamMateName: teamMateName
    })
  }

	onInputChange (fieldName, e) {
		if (fieldName === 'teamName') {
			this.setState({ teamName : e.target.value })
	  }
	}
}
