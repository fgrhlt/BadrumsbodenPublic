import { combineReducers } from 'redux'
import shoppingcartReducer from './shoppingcartReducer.js'
import firebaseReducer from './firebaseReducer.js'

const rootReducer = combineReducers({
  shoppingcartReducer,
  firebaseReducer
 })

export default rootReducer
