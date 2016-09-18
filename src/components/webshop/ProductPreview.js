import React, { Component } from 'react'
require('styles/_webshopPage/products.css')

export default class ProductElement extends Component {

  render() {
    const { item } = this.props
    const { url, title, description, price } = item

    return (
      <div>
        <figure style={{backgroundImage: 'url(' + url + ')'}} />
        <h4>{title || 'hej'}</h4>
        <p>{description}</p>
        <div className="buy-btn">
            <span>{price}:-</span>
            <span>Mer info</span>
        </div>
      </div>
    )
  }
}
