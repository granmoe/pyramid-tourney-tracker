import C from '../../constants'
import initialState from '../initial-state'

export default function (currentstate, action) {
    switch (action.type) {
        case C.ATTEMPTING_LOGIN:
            return {
                currently: C.AWAITING_AUTH_RESPONSE,
                uid: null,
                username: null
            }
        case C.LOGOUT:
            return {
                currently: C.ANONYMOUS,
                username: null,
                uid: null
            }
        case C.LOGIN_USER:
            return {
                currently: C.LOGGED_IN,
                uid: action.uid
            }
        case C.SET_PROFILE:
          console.log('profile action', action)
          return {
            username: action.data.displayName
          }
        case C.RESET_PROFILE:
          return {
            username: null
          }
        default: return currentstate || initialState.auth
    }
}
