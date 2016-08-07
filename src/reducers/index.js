import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

//import gallery from './gallery'
const gallery = {hej: 'hejhej'}

const rootReducer = combineReducers({ gallery, routing: routerReducer })

export default rootReducer
