import React, { Component } from 'react'

import LandingPageHeader from './LandingPageHeader'
import WelcomeInfo from './WelcomeInfo'
import DepartmentPicker from './DepartmentPicker'
import LandingPageFeatures from './LandingPageFeatures'
import LandingPageFooter from './LandingPageFooter'

export default class LandingPage extends Component {

  render() {
    return (
      <div>
        <LandingPageHeader></LandingPageHeader>
        <WelcomeInfo></WelcomeInfo>
        <DepartmentPicker></DepartmentPicker>
        <LandingPageFeatures></LandingPageFeatures>
        <LandingPageFooter></LandingPageFooter>
      </div>
    )
  }
}
