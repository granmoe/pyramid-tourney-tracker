import React from 'react'
import _ from 'lodash'
import data from '../utilities/data-service.js'
import base from '../utilities/rebase-service.js'

export default class TeamForm extends React.Component {
	constructor (props) {
		super(props)
	    this.state = { profiles: [], formOpen: false, isDuplicate: false }
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
    var errorMessage
    var isDisabled

    if (this.state.formOpen) {
      collapseIcon = 'remove'

      options = _(this.state.profiles).reject( profile => {
        return profile.key === this.props.userid
      }).map( profile => {
        return <option key={profile.key} data-username={profile.displayName} value={profile.key}>{profile.displayName}</option>
      }).value()

        if (!this.state.teamName || !this.state.teamMateId || this.state.isDuplicate) { isDisabled = true }

      if (this.state.isDuplicate) {
        errorMessage = <div>Sorry, that team name is already taken! Be a little more original.<br /><br /></div>
      }

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
 			<form action="" className='teams__create-form'>
				<div onClick={this.onClickCreate.bind(this)} className='teams__collapse-button'>
					<span>Create New Team</span>
					<i className='material-icons teams__collapse-icon'>{collapseIcon}</i>
				</div>
        {errorMessage}
        {formFields}
        {submitButton}
			</form>
    )
  }

  createTeam (e) {
    e.preventDefault()

      var users = {}
    users[this.props.userid] = { displayName: this.props.username }
    users[this.state.teamMateId] = { displayName: this.state.teamMateName }

    data.createTeam(this.state.teamName, users)

      this.state.teamName = '' // todo: create a method to reset the form
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

        this.checkForDuplicates(e.target.value)
	  }
	}

  checkForDuplicates (name) {
    if (_.includes(this.props.teamNames, name)) {
      this.setState({ isDuplicate: true })
    } else {
      this.setState({ isDuplicate: false })
    }
  }
}
