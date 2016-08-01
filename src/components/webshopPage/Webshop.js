import React, { Component, PropTypes } from 'react'
import DropdownMenu from './DropdownMenu'

require('styles/_webshopPage/main.css')

export default class Webshop extends Component {

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

      </div>
    )
  }
}
