import React, { Component } from 'react'

import Header from './Header'
import ServiceSelector from './ServiceSelector'
import PriceCalculator from './PriceCalculator'
import VVSRequest from './VVSRequest'
import VVSFeatures from './VVSFeatures'
import GalleryPreview from './GalleryPreview'
import Footer from './Footer'

require('styles/_servicesPage/services.css')
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');


export default class Services extends Component {

  componentWillMount() {

    this.state = {
      // Can be left or right depending on click
      userChoice: null
    }
  }
  /* Update the users choice of service */
  changeUserChoice(userChoice) {
    this.setState({userChoice});
  }

  render() {
    return (
      <div>
        <Header />
        <ServiceSelector changeUserChoice={this.changeUserChoice.bind(this)}/>

        {/* Not done */}
        <ReactCSSTransitionGroup transitionName = "serviceTransition"
               transitionAppear = {true} transitionAppearTimeout = {5000}
               transitionEnter = {true}  transitionEnterTimeout = {5000}
               transitionLeave = {false}>

                   <PriceCalculator />
                   <VVSFeatures />
                   <VVSRequest />
        </ReactCSSTransitionGroup>


        <GalleryPreview />
        <Footer />
      </div>
    )
  }
}
