import firebase from 'firebase'
import C from '../constants'

const fireRef = new firebase(C.FIREBASE + '/profiles')

const profilesActions = {
  startListeningToProfiles () {
    return (dispatch, getState) => {
      fireRef.on('value', snapshot => {
        dispatch({ type: C.SET_PROFILES, data: snapshot.val() })
      })
    }
  }
}

export default profilesActions
