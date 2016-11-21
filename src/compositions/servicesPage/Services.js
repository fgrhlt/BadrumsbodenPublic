import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
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
  hideCalculators() {
    this.setState({
      showPriceCalculator: false,
      showVVSRequest: false,
    })
  }

  render() {
    return (
      <div id="services">
        <Header />
        <ServiceSelector
          displayCalculators={this.displayCalculators.bind(this)}
          hideCalculators={this.hideCalculators.bind(this)}
        />

        <ReactCSSTransitionGroup
        transitionName="dropDown"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}>
          {this.state.showPriceCalculator ?
              <div className="container">
                <BathroomFeatures />
                <PriceCalculator />
              </div> : null
          }
        </ReactCSSTransitionGroup>

        <ReactCSSTransitionGroup
        transitionName="dropDown"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={1000}>
          {this.state.showVVSRequest ?
            <div className="container">
              <VVSFeatures />
              <VVSRequest />
            </div> : null
          }
        </ReactCSSTransitionGroup>

        <GalleryPreview />
        <Footer />
      </div>
    )
  }
}
