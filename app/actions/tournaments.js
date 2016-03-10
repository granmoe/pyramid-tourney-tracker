import C from '../constants'
import Firebase from 'firebase'

const fireRef = new Firebase(C.FIREBASE + '/tournaments')

export default {
	startListeningToTournaments() {
		return (dispatch, getState) => {
			fireRef.on('value', snapshot => {
        dispatch({ type: C.SET_TOURNAMENTS, data: snapshot.val() })
      })
		}
	}
}
