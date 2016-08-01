import React, { Component, PropTypes } from 'react'
import DropdownMenu from './DropdownMenu'
import Slider from 'react-slick'

require('styles/_webshopPage/dropdownMenu.css')
require('styles/global.css')

export default class Webshop extends Component {

componentWillMount() {
  this.state = {
      settings: {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }
}

  render() {
    return (
      <div>
        <div className="header">
          <p>Tillbaka till portalen</p>
          <img id="logo" src="assets/logo/logo.svg"></img>

          <div className="searchBar">
            <input placeholder="Vad söker du efter?"></input>
            <img id="searchBarImg" src="assets/buttons/search_button.svg"></img>
          </div>
        </div>

        <DropdownMenu/>

        <div className="campaign">
          <h1>Hej detta är kampanj jao</h1>
          <img id="campaign" src="assets/images/campaign.jpg"></img>
        </div>

        <div className="topSales"></div>

        <h2>Slider babyyy</h2>



      </div>
    )
  }
}
