import C from '../constants'
import Firebase from 'firebase'

const fireRef = new Firebase(C.FIREBASE)

const authActions = {
	startListeningToAuth() {
		return (dispatch, getState) => {
			fireRef.onAuth( authData => {
				if (authData) {
					dispatch({
						type: C.LOGIN_USER,
						uid: authData.uid
					})
          this.startListeningToProfile(dispatch, authData.uid)
				} else {
          this.stopListeningToProfile(dispatch)
					if (getState().auth.currently !== C.ANONYMOUS) {
						dispatch({ type: C.LOGOUT })
            dispatch({ type: C.RESET_PROFILE })
					}
				}
			})
		}
	},

  startListeningToProfile (dispatch, uid) {
    this.profileRef = fireRef.child('profiles/' + uid)
    this.profileRef.on('value', snapshot => {
      console.log('profile event',snapshot)
      dispatch({
        type: C.SET_PROFILE,
        data: snapshot.val()
      })
    })
  },

  stopListeningToProfile (dispatch) {
    this.profileRef.off('value')
    delete this.profileRef
  },

	attemptLogin() {
		return dispatch => {
			dispatch({ type: C.ATTEMPTING_LOGIN })
			fireRef.authWithPassword(userObj, error => {
				if (error) {
					dispatch({ type: C.DISPLAY_ERROR, error: 'Login failed! ' + error })
					dispatch({ type: C.LOGOUT })
				}
			})
		}
	},

	logoutUser() {
		return (dispatch) => {
			dispatch({ type: C.LOGOUT })
			fireRef.unauth()
		}
	}
}

export default authActions
