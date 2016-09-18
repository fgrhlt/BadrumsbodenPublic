import React, { Component } from 'react'
require('styles/_webshopPage/products.css')

export default class ProductElement extends Component {

  render() {
    return (
      <div>
        <figure style={{backgroundImage:'url(http://placekitten.com/800/600)'}} />
        <h4>Badkar F45</h4>
        <p>Ett fett stort badkar som är grått</p>

        <div className="buy-btn">
            <span>350:-</span>
            <span>Mer info</span>
        </div>
      </div>
    )
  }
}
