import React, { Component } from 'react'
import ComponentTitle from '../ComponentTitle'
import ProductMenu from './ProductMenu'
import ProductTable from './ProductTable'

require('styles/_adminSimon/_products/products.css')

export default class Products extends Component {

  render() {
    return (
      <div id="products">
        <ComponentTitle
          title={"Produkter"}
          text={"Ändra, lägg till och ta bort produkter i webbshopen. " + 
                "Du kan även välja vilka produkter som ska vara toppsäljare."}
        />

        <div id="container">
          <div>
            <ProductMenu />
          </div>

          <div>
            <ProductTable />
          </div>
        </div>
      </div>
    )
  }
}
