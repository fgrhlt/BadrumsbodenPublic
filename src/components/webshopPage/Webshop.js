import React, { Component, PropTypes } from 'react'
import DropdownMenu from './DropdownMenu'

require('styles/_webshopPage/dropdownMenu.css')

export default class Webshop extends Component {

  componentWillMount() {
    this.setState({
      autoplay: true,
    })
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

        <div className="confirmations">
          <div className="iconContainer">
            <div className="circle">
              <img src="assets/icons/shipping.svg"></img>
            </div>

            <p>Garanti på alla varor</p>
          </div>
        </div>

      </div>
    )
  }
}
