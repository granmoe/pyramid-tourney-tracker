import C from '../../constants'
import initialState from '../initial-state'

export default function (currentState, action) {
  var data = action.data
  switch (action.type) {
    case C.ATTEMPTING_LOGIN:
      return { ...currentState, ...data }
    case C.LOGIN_ERROR:
      return { ...currentState, ...data }
    case C.REGISTER_ERROR:
      return { ...currentState, ...data }
    case C.LOGIN_USER:
      return { ...currentState, ...data }
    case C.LOGOUT:
      return {...currentState,
        current: C.ANONYMOUS,
        uid: null,
        username: null
      }
    default: return currentState || initialState.auth
  }
}

