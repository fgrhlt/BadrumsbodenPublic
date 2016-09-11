import React, { Component } from 'react'
import ComponentTitle from '../ComponentTitle'
import ProductMenu from '../Products/ProductMenu'

require('styles/_adminSimon/_categories/categories.css')

export default class Categories extends Component {

  render() {
    return (
      <div id="categories">
        <ComponentTitle
          title={"Kategorier"}
          text={"Ändra namn på kategorier i webbshopen"}
        />

        <div id="container">
          <div>
            <ProductMenu />
          </div>
        </div>
      </div>
    )
  }
}
