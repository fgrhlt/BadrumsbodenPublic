import { createStore /*, compose */ } from 'redux'

import rootReducer from '../reducers/index.js'

//Loading initialState from server
// const defaultState = {
//   toggleClicked: false
// }
// (rootReducer, defaultState) when to use

const store = createStore(rootReducer)

export default store
