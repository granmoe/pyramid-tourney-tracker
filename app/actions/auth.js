import firebase from 'firebase'
import C from '../constants'
import profileActions from './profile' // TODO: Any way to avoid reaching into another action creator?

const fireRef = new firebase(C.FIREBASE)

const authActions = {
  startListeningToAuth() {
    return (dispatch, getState) => {
 	  fireRef.onAuth( authData => {
 	    if (authData) {
  		  dispatch({
  		    type: C.LOGIN_USER,
  		    uid: authData.uid
  		  })
          profileActions.startListeningToProfile(dispatch, getState, authData.uid)
  	    } else {
          profileActions.stopListeningToProfile(dispatch, getState)
		  if (getState().auth.current !== C.ANONYMOUS) {
  		    dispatch({ type: C.LOGOUT })
            dispatch({ type: C.RESET_PROFILE })
   		  }
  	    }
  	  })
    }
  },

  attemptLogin(userObj) {
    return (dispatch, getState) => {
      dispatch({ type: C.ATTEMPTING_LOGIN })

      fireRef.authWithPassword(userObj, (error, authData) => {
        if (error) {
          dispatch({ type: C.LOGIN_ERROR, data: { loginErrorMessage: 'Login failed! ' + error } })
          dispatch({ type: C.LOGOUT })
        }
      })
    }
  },

  logoutUser() {
    return (dispatch, getState) => {
      dispatch({ type: C.LOGOUT })
      fireRef.unauth()
    }
  },

  // not sure if this needs to be tracked in app state, but it could be in the future
  // maybe move to login page and automatically fill form and login after this?
  createUser(userObj) { // could dispatch something saying that a user was created with username
    return (dispatch, getState) => {
      return fireRef.createUser(userObj)
    }
  }
}

export default authActions
