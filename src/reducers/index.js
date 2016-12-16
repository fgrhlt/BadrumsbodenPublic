import { combineReducers } from 'redux'
import shoppingcartReducer from './shoppingcartReducer.js'
import firebaseReducer from './firebaseReducer.js'
import paymentReducer from './paymentReducer.js'

const rootReducer = combineReducers({
  shoppingcartReducer,
  firebaseReducer,
  paymentReducer
 })

export default rootReducer
