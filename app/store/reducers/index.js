import { combineReducers } from 'redux'
import authReducer from './auth'
import tournamentsReducer from './tournaments'
import profileReducer from './profile'
import profilesReducer from './profiles'

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  profiles: profilesReducer,
  tournaments: tournamentsReducer
})

export default rootReducer
