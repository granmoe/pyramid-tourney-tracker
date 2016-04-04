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
  		    data: {
              uid: authData.uid,
              current: C.LOGGED_IN,
              loginErrorMessage: null
            }
  		  })
          profileActions.startListeningToProfile(dispatch, getState, authData.uid)
  	    } else {
          profileActions.stopListeningToProfile(dispatch, getState)
		  if (getState().auth.current !== C.ANONYMOUS) {
  		    dispatch({ type: C.LOGOUT })
            profileActions.resetProfile(dispatch)
   		  }
  	    }
  	  })
    }
  },

  attemptLogin(userObj) {
    return (dispatch, getState) => {
      dispatch({ type: C.ATTEMPTING_LOGIN, data: { current: C.AWAITING_AUTH_RESPONSE } })
      return fireRef.authWithPassword(userObj)
    }
  },

  logoutUser() {
    return (dispatch, getState) => {
      dispatch({ type: C.LOGOUT })
      fireRef.unauth()
      profileActions.resetProfile(dispatch)
    }
  },

  loginError (message) {
    return {
      type: C.LOGIN_ERROR,
      data: { loginErrorMessage: message }
    }
  },

  registerError (message) {
    return {
      type: C.REGISTER_ERROR,
      data: { registerErrorMessage: message }
    }
  },

  // not sure if this needs to be tracked in app state, but it could be in the future
  // maybe move to login page and automatically fill form and login after this?
  // or auth status could change to 'awaiting register response'
  createUser(userObj) { // could dispatch something saying that a user was created with username
    return (dispatch, getState) => {
      return fireRef.createUser(userObj)
    }
  }
}

export default authActions
