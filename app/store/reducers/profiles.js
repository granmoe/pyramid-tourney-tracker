import C from '../../constants'
import initialState from '../initial-state'

export default function (currentState, action) {
  switch (action.type) {
    case C.SET_PROFILES:
      return Object.assign({}, currentState, action.data)
    default: return currentState || initialState.profiles
  }
}
