import React, { Component, PropTypes } from 'react'
import DropdownMenu from './DropdownMenu'

require('normalize.css/normalize.css')
require('styles/App.css')

export default class AppComponent extends Component {
  //propTypes={}

  render() {
    return (
      <div>
        <div className="header">
          <p>Tillbaka till portalen</p>
          <img id="logo" src="images/logo.svg"></img>

          <div className="searchBar">
            <input placeholder="Vad söker du efter?"></input>
            <img id="searchBarImg" src="images/search_button.svg"></img>
          </div>
        </div>

        <DropdownMenu/>

        <div className="campaign">
          <h1>Hej detta är kampanj jao</h1>
          <img id="campaign" src="images/campaign.jpg"></img>
        </div>

        <div className="topSales"></div>

      </div>
    )
  }
}
