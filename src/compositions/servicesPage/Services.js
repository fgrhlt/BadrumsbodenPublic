import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'

import Header from '../../components/services/Header'
import ServiceSelector from '../../components/services/ServiceSelector'
import PriceCalculator from '../../components/services/PriceCalculator'
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

  // handleClick(e) {
  //   const userChoice = e.target.className
  //   this.setState({ userChoice })
  // }

  toggleDiv(toggle) {
    this.setState({showPriceCalculator: toggle})
    console.log('eff',toggle);
  }

  render() {
    var styleVar = {
      backgroundImage: 'url(assets/images/services/service_bg.jpg)'
    }
    console.log(this.state.showPriceCalculator);
    return (
      <div>
        <Header />
        <ServiceSelector toggleDiv={this.toggleDiv.bind(this)}/>

        {this.state.showPriceCalculator ?
          <div >
            <VVSFeatures/>
            <PriceCalculator toggleDiv={this.toggleDiv.bind(this)}/>
          </div> : null
        }

          {/*<VVSFeatures />
          <VVSRequest />*/}

        <GalleryPreview />
        <Footer />
      </div>
    )
  }
}
