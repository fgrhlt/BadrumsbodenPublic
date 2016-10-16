import React, { Component } from 'react'
import { browserHistory } from 'react-router'
require('styles/_webshopPage/products.css')

export default class SubCategoryList extends Component {

  render() {
    return (
      <div id="productlist1">
        <ul>
          {this.props.subcatItems.map((item, key) => {
            return <li key={key}>{item}</li>
          })}
        </ul>
      </div>
    )
  }
}
