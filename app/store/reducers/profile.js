import C from '../../constants'
import initialState from '../initial-state'

export default function (currentState, action) {
  switch (action.type) {
    case C.SET_PROFILE:
      return action.data
    case C.RESET_PROFILE:
      return initialState.profile
    default: return currentState || initialState.profile
  }
}
