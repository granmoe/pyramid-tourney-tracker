import React from 'react'
import data from '../utilities/data-service'
var base = data.base

export default class UserToolbar extends React.Component {
	componentWillMount () {
		this.state = {}
		this.ref = base.bindToState('profiles/' + this.props.uid, {
			context: this,
			state: 'profile'
		})
	}

	componentWillUnmount () {
		base.removeBinding(this.ref)
	}

	logout() {
		data.root.unauth()
	}

	render () {
		return (
			<li className='navbar__item navbar__text'>
				<div className='navbar__display-name'>
					Logged In As {this.state.profile && this.state.profile.displayName}
				  &nbsp;
					<a href='javascript:void(0)' onClick={this.logout.bind(this)}>(logout)</a>
				</div>
			</li>
		)
	}
}

