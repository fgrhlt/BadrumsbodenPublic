import React, { Component } from 'react'
import { browserHistory } from 'react-router'
require('../../../styles/_webshopPage/products.css')

export default class TopSellerProduct extends Component {

  // onClick() {
  //   const { item } = this.props
  //   const { articleNr, category, subcategory } = item
  //
  //   // let path = ''
  //   // browserHistory.listen( (event) => {
  //   //   path = event.pathname.replace('/newAdmin', '')
  //   // })
  //
  //   browserHistory.push(path+'/'+category+'/'+subcategory+'/'+articleNr)
  // }

  onClick() {
    const { item } = this.props
    const { articleNr, category, subcategory } = item

    browserHistory.push('/webshop/'+category+'/'+subcategory+'/'+articleNr)
  }

  render() {
    const { item } = this.props
    const { supplier, price, productName, url } = item

    return (
      <div onClick={this.onClick.bind(this)}>
        <figure style={{backgroundImage: 'url(' + url + ')'}} />
        <h4>{productName}</h4>
        <p>{supplier}</p>
        <span>{price}:-</span>
      </div>
    )
  }
}
