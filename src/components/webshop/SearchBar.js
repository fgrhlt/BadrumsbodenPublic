import React, { Component } from 'react'

export default class Webshop extends Component {

  render() {
    return (
      <div className="searchBar">
        <input type="text" placeholder="Vad söker du efter?"></input>
        <img src="assets/buttons/search_button.svg"></img>
      </div>
    )
  }
}
