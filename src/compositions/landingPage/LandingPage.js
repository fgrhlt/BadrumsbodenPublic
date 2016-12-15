import React, { Component } from 'react'
import LandingPageHeader from '../../components/landingPage/LandingPageHeader'
import WelcomeInfo from '../../components/landingPage/WelcomeInfo'
import LandingPageFeatures from '../../components/landingPage/LandingPageFeatures'
import LandingPageFooter from '../../components/landingPage/LandingPageFooter'

export default class LandingPage extends Component {
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
