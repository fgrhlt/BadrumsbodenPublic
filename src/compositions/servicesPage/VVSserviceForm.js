import React, { Component } from 'react'
import Header from '../../components/services/Header'
import VVSFeatures from '../../components/services/VVSFeatures'
import VvsRequest from '../../components/services/VvsRequest'
import MobileServicePage from '../../components/services/MobileServicePage'
import Footer from '../../components/services/Footer'
require('../../styles/_servicesPage/services.css')

export default class VVSserviceForm extends Component {
  render() {
    return (
      <div id="services">
        <Header />
        <MobileServicePage />
        <VvsRequest />
        <VVSFeatures />
        <Footer />
      </div>
    )
  }
}
