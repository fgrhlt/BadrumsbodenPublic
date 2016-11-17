import React, { Component } from 'react'
import LandingPageHeader from '../../components/landingPage/LandingPageHeader'
import WelcomeInfo from '../../components/landingPage/WelcomeInfo'
import DepartmentPicker from '../../components/landingPage/DepartmentPicker'
import LandingPageFeatures from '../../components/landingPage/LandingPageFeatures'
import LandingPageFooter from '../../components/landingPage/LandingPageFooter'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../actions/firebaseActions'

 class LandingPage extends Component {

  componentWillMount() {
    this.props.fetchFirebaseData('campaign')
  }

  render() {
    return (
      <div>
        <LandingPageHeader></LandingPageHeader>
        <WelcomeInfo></WelcomeInfo>
        <LandingPageFeatures></LandingPageFeatures>
        <LandingPageFooter></LandingPageFooter>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    firebaseData: state.firebaseReducer.firebaseData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(firebaseActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
