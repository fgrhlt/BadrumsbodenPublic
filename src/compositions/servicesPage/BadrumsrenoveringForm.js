import React, { Component } from 'react'
import Header from '../../components/services/Header'
import BathroomFeatures from '../../components/services/BathroomFeatures'
import PriceCalculator from '../../components/services/PriceCalculator'
import MobileServicePage from '../../components/services/MobileServicePage'
import Footer from '../../components/services/Footer'
require('../../styles/_servicesPage/services.css')

export default class BadrumsrenoveringForm extends Component {
  render() {
    window.scrollTo(0,0)
    return (
      <div id="services">
        <Header />
        <MobileServicePage />
        <PriceCalculator />
        <BathroomFeatures />
        <Footer />
      </div>
    )
  }
}
