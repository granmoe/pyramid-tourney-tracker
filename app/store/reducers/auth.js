import C from '../../constants'
import initialState from '../initial-state'

export default function (currentState, action) {
  switch (action.type) {
    case C.ATTEMPTING_LOGIN:
      return Object.assign({}, currentState, {
        current: C.AWAITING_AUTH_RESPONSE
      })
    case C.LOGOUT:
      return Object.assign({}, currentState, {
        current: C.ANONYMOUS,
        uid: null,
        username: null
      })
    case C.LOGIN_USER:
      return Object.assign({}, currentState, {
        current: C.LOGGED_IN,
        uid: action.uid
      })
    case C.SET_PROFILE:
      return Object.assign({}, currentState, {
        username: action.data.displayName
      })
    case C.RESET_PROFILE:
      return Object.assign({}, currentState, {
        username: null
      })
    default: return currentState || initialState.auth
  }
}
