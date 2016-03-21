import firebase from 'firebase'
import C from '../constants'

const fireRef = new firebase(C.FIREBASE)
var profileRef = null

const profileActions = {
  startListeningToProfile (dispatch, getState, uid) {
    profileRef = fireRef.child('profiles/' + uid)

    profileRef.on('value', snapshot => {
      dispatch({
        type: C.SET_PROFILE,
        data: snapshot.val()
      })
    })
  },

  stopListeningToProfile (dispatch, getState) {
    if (profileRef) {
      profileRef.off('value')
      profileRef = null
    }
  },

  resetProfile (dispatch) {
    dispatch({ type: C.RESET_PROFILE })
  },

  createProfile (user) {
    return (dispatch, getState) => {
      fireRef.child('profiles').child(user.uid).set({
        displayName: user.displayName,
        role: 'user',
        tournaments: {},
        teams: {},
        matches: {},
        wins: 0,
        losses: 0,
        ties: 0,
        average: 0,
        standing: 'none'
      })
    }
  }
}

export default profileActions
