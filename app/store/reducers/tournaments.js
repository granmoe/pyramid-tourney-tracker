import C from '../../constants'
import initialState from '../initial-state'

export default function (currentState, action) {
  switch (action.type) {
    case C.SET_TOURNAMENTS:
      return action.data
    default: return currentState || initialState.tournaments
  }
}
