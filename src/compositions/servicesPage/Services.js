import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'

import Header from '../../components/services/Header'
import ServiceSelector from '../../components/services/ServiceSelector'
import PriceCalculator from '../../components/services/PriceCalculator-copy'
import VVSRequest from '../../components/services/VvsRequest'
import VVSFeatures from '../../components/services/VVSFeatures'
import GalleryPreview from '../../components/services/GalleryPreview'
import Footer from '../../components/services/Footer'

require('styles/_servicesPage/services.css')
require('styles/_servicesPage/serviceSelector.css')
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

export default class Services extends Component {

  componentWillMount() {
    this.state = {
      showPriceCalculator: false
    }
  }

  render() {
    var styleVar = {
      backgroundImage: 'url(assets/images/services/service_bg.jpg)'
    }
    return (
      <div>
        <Header />
        <ServiceSelector />

          <div>
            <VVSFeatures/>
            <PriceCalculator/>
          </div>

          {/*<VVSFeatures />
          <VVSRequest />*/}

        <GalleryPreview />
        <Footer />
      </div>
    )
  }
}
