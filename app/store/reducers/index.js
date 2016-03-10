import { combineReducers } from 'redux'
import authReducer from './auth'
import tournamentsReducer from './tournaments'

const rootReducer = combineReducers({
	auth: authReducer,
  tournaments: tournamentsReducer
})

export default rootReducer
