import React, { Component } from 'react'

require('styles/_adminSimon/adminWebshopMenu.css')

export default class AdminWebshopMenu extends Component {

  render() {
    return (
      <div id="adminWebshopMenu">
        <div>
          <p>Produkter, kategorier och toppsäljare</p>
        </div>

        <div>
          <p>Kampanjer och banner</p>
        </div>
      </div>
    )
  }
}
