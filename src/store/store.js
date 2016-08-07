import { createStore, compse } from 'redux'
import { syncHistoryWithStore} from 'react-router-redux'
import { browserHistory } from 'react-router'

//Import route reducer
import rootReducer from '../reducers/index'

//Create an object for the default data
const defaultState = {
  toggleClicked: false
}

const store = createStore(rootReducer, defaultState)

export const history = syncHistoryWithStore(browserHistory, store)

export default store
