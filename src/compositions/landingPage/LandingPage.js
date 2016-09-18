import React, { Component } from 'react'
import LandingPageHeader from '../../components/landingPage/LandingPageHeader'
import WelcomeInfo from '../../components/landingPage/WelcomeInfo'
import DepartmentPicker from '../../components/landingPage/DepartmentPicker'
import LandingPageFeatures from '../../components/landingPage/LandingPageFeatures'
import LandingPageFooter from '../../components/landingPage/LandingPageFooter'

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
