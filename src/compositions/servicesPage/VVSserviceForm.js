import React, { Component } from 'react'
import Header from '../../components/services/Header'
import VVSFeatures from '../../components/services/VVSFeatures'
import VVSRequest from '../../components/services/VVSRequest'
import MobileServicePage from '../../components/services/MobileServicePage'
import Footer from '../../components/services/Footer'
require('../../styles/_servicesPage/services.css')

export default class VVSserviceForm extends Component {

  componentWillMount() {
    console.log(window);
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div id="services">
        <Header />
        <MobileServicePage />
        <VVSRequest />
        <VVSFeatures />
        <Footer />
      </div>
    )
  }
}
