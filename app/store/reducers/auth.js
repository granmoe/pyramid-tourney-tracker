import C from '../../constants'
import initialState from '../initial-state'

export default function (currentState, action) {
  switch (action.type) {
    case C.ATTEMPTING_LOGIN:
      return Object.assign({}, currentState, {
        current: C.AWAITING_AUTH_RESPONSE
      })
    case C.LOGIN_ERROR:
      return Object.assign({}, currentState, {
        loginErrorMessage: action.data.loginErrorMessage
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
    default: return currentState || initialState.auth
  }
}
