import React, { Component } from 'react'

import Header from './Header'
import WelcomeInfo from './WelcomeInfo'
import DepartmentPicker from './DepartmentPicker'
import Features from './Features'
import Footer from './Footer'

export default class LandingPage extends Component {

  render() {
    return (
      <div>
        <Header></Header>
        <WelcomeInfo></WelcomeInfo>
        <DepartmentPicker ></DepartmentPicker>
        <Features ></Features>
        <Footer></Footer>
      </div>
    )
  }
}
