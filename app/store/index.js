import { applyMiddleware, createStore } from 'redux'
import rootReducer from './reducers'
import initialState from './initial-state'
import thunk from 'redux-thunk' // to use asynchronous actions

// A super-simple logger
var logger = store => next => action => {
	console.log('dispatching', action.type,action)
	var result = next(action)
	console.log('next state', store.getState())
	return result
}


export default applyMiddleware(thunk,logger)(createStore)(rootReducer,initialState);
