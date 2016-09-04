import React, { Component } from 'react'

require('styles/_adminSimon/products/productMenu.css')

export default class ProductMenu extends Component {
  toggleMenu() {

  }

  render() {
    return (
      <div id="productMenu">

        <div onClick={this.toggleMenu.bind(this)}>
          <a href="#"><h4>Badrumsinredning</h4></a>
          <ul>
            <a href="#"><li>Badrumsmöbler</li></a>
            <a href="#"><li>Badrumsmöbler</li></a>
            <a href="#"><li>Badrumsmöbler</li></a>
            <a href="#"><li>Badrumsmöbler</li></a>
          </ul>
        </div>

        <div>
          <a href="#"><h4>Dusch & badkar</h4></a>
          <ul>
            <a href="#"><li>Badrumsmöbler</li></a>
            <a href="#"><li>Badrumsmöbler</li></a>
            <a href="#"><li>Badrumsmöbler</li></a>
            <a href="#"><li>Badrumsmöbler</li></a>
          </ul>
        </div>

        <div>
          <a href="#"><h4>Annat</h4></a>
          <ul>
            <a href="#"><li>Badrumsmöbler</li></a>
            <a href="#"><li>Badrumsmöbler</li></a>
            <a href="#"><li>Badrumsmöbler</li></a>
            <a href="#"><li>Badrumsmöbler</li></a>
          </ul>
        </div>

        <div id="yellow">
          <a href="#"><h4>Se alla toppsäljare</h4></a>
        </div>

      </div>
    )
  }
}
