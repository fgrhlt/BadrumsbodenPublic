import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'

import Header from '../../components/services/Header'
import ServiceSelector from '../../components/services/ServiceSelector'
import PriceCalculator from '../../components/services/PriceCalculator'
import VVSRequest from '../../components/services/VvsRequest'
import VVSFeatures from '../../components/services/VVSFeatures'
import BathroomFeatures from '../../components/services/BathroomFeatures'
import GalleryPreview from '../../components/services/GalleryPreview'
import Footer from '../../components/services/Footer'

require('styles/_servicesPage/services.css')

export default class Services extends Component {

  componentWillMount() {
    this.state = {
      showPriceCalculator: false,
      showVVSRequest: false,
      containerStyle: ''
    }
  }

  /* Update what to show depending on which service-box the user clicks in ServiceSelector */
  displayCalculators(userChoice) {
    if(userChoice == 'left') {
      this.setState({
        showPriceCalculator: true,
        showVVSRequest: false,
      })
    }
    else if(userChoice == 'right') {
      this.setState({
        showPriceCalculator: false,
        showVVSRequest: true
      })
    }
  }

  render() {
    return (
      <div id="services">
        <Header />
        <ServiceSelector displayCalculators={this.displayCalculators.bind(this)}/>

        {this.state.showPriceCalculator ?
          <div>
            <BathroomFeatures />
            <PriceCalculator />
          </div> : null
        }

        {this.state.showVVSRequest ?
          <div>
            <VVSFeatures />
            <VVSRequest />
          </div> : null
        }

        <GalleryPreview />
        <Footer />
      </div>
    )
  }
}
