import React, { Component } from 'react'

import Header from './Header'
import ServiceSelector from './ServiceSelector'
import PriceCalc from './PriceCalc'
import VvsRequest from './VvsRequest'
import Features from './Features'
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
    console.log(this.state)
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

                   {/* <PriceCalc /> */}

                   <Features />
                   <VvsRequest />
        </ReactCSSTransitionGroup>


        <GalleryPreview />
        <Footer />
      </div>
    )
  }
}
