import React, { Component } from 'react'

import Header from './Header'
import ServiceSelector from './ServiceSelector'
import PriceCalc from './PriceCalc'
import VvsRequest from './VvsRequest'
import Features from './Features'
import Footer from './Footer'

require('styles/_servicesPage/services.css')

export default class Services extends Component {

  render() {
    return (
      <div>
        <Header />
        <ServiceSelector />
        <Features />
        {/* <PriceCalc /> */}
        <VvsRequest />
        <Footer />
      </div>
    )
  }
}
