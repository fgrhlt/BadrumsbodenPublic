import React, { Component } from 'react'
import ComponentTitle from '../ComponentTitle'
import ProductMenu from './ProductMenu'
import ProductTable from './ProductTable'

require('styles/_adminSimon/_products/products.css')

export default class Products extends Component {

componentWillMount() {
  this.state = {
    showProductTable: false
  }
}

showProductTable() {
  this.setState({
    showProductTable: true
  })
}

  render() {
    return (
      <div id="adminProducts">
        <ComponentTitle
          title={"Produkter"}
          text={"Ändra, lägg till och ta bort produkter i webbshopen. " +
                "Du kan även välja vilka \nprodukter som ska vara toppsäljare " +
                "genom att trycka på stjärnan i produktlistan."}
        />

        <div id="container">
          <ProductMenu showProductTable={this.showProductTable.bind(this)}/>
          { this.state.showProductTable? <ProductTable /> : ''}
        </div>
      </div>
    )
  }
}
