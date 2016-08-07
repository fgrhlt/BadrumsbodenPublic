import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/actionCreators'

import LandingPage from './landingPage/LandingPage'

function mapStateToProps(state) {
  return {
    toggleClicked: state.toggleClicked
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

const App = connect(mapStateToProps, mapDispatchToProps)(LandingPage)

export default App
