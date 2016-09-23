import React, { Component } from 'react'
import { browserHistory } from 'react-router'
require('styles/_webshopPage/products.css')

export default class ProductPreview extends Component {

  onClick() {
    const { item } = this.props
    const { folder, articleNr } = item

    browserHistory.push('/webshop/'+'badrumsinredning/aggregat/'+articleNr) // TEST
    //browserHistory.push('/webshop/'+folder+articleNr)
  }

  render() {
    const { item } = this.props
    const { url, title, description, price } = item

    return (
      <div onClick={this.onClick.bind(this)}>
        <figure style={{backgroundImage: 'url(' + url + ')'}} />
        <h4>{title}</h4>
        <p>{description}</p>
        <div className="buy-btn">
          <span>{price}:-</span>
          <span>Mer info</span>
        </div>
      </div>
    )
  }
}
