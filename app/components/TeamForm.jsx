import React from 'react'
import { base } from '../utilities/data-service.js'

export default class TeamForm extends React.Component {
	constructor (props) {
		super(props)
	  this.state = { profiles: [], formOpen: false }
	}

	componentDidMount () {
		this.dataStream = base.bindToState('profiles', {
			context: this,
			state: 'profiles',
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

    if (this.state.formOpen) {
      collapseIcon = 'remove'
      options = this.state.profiles.map( profile => {
        return <option value={profile.uid} >{profile.displayName}</option>
      })
      formFields = <div>
	  			<input className='teams__team-name' name='name' onChange={this.onInputChange.bind(this, 'name')} value={this.state.name} type='text' placeholder='team name' />
          <select className='teams__select-user'>
            {options}
          </select>
        </div>
    } else {
      collapseIcon = 'add'
    }

    return (
 			<form className='teams__create-form'>
				<div onClick={this.onClickCreate.bind(this)} className='teams__create-button'>
					<span>Create New Team</span>
					<i className='material-icons teams__collapse-icon'>{collapseIcon}</i>
				</div>
        {formFields}
			</form>
    )
  }

	onInputChange (fieldName, e) {
		if (fieldName === 'email') {
			this.setState({ email : e.target.value })
		} else if (fieldName === 'password') {
			this.setState({ password : e.target.value })
		} else if (fieldName === 'displayName') {
			this.setState({ displayName : e.target.value })
	  }
	}
}
