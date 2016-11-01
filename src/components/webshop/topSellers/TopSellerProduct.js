import React, { Component } from 'react'
import { browserHistory } from 'react-router'
require('styles/_webshopPage/products.css')

export default class TopSellerProduct extends Component {

  onClick() {
    const { item } = this.props
    const { articleNr } = item

    let path = ''
    browserHistory.listen( (event) => {
      path = event.pathname.replace('/newAdmin', '')
    })

    browserHistory.push(path+'/search/'+articleNr)
  }

  render() {
    const { item } = this.props
    const { price, description, productName, url } = item

    return (
      <div onClick={this.onClick.bind(this)}>
        <figure style={{backgroundImage: 'url(' + url + ')'}} />
        <h4>{productName}</h4>
        <p>{description}</p>
        <span>{price}:-</span>
      </div>
    )
  }
}
