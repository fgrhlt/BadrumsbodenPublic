import React, { Component } from 'react'
import ComponentTitle from '../../components/admin/ComponentTitle'
import ProductMenu from '../../components/admin/Products/ProductMenu'
import ProductTable from '../../components/admin/Products/ProductTable'

require('styles/_admin/_products/products.css')

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
          title="Produkter"
          text={'Ändra, lägg till och ta bort produkter i webbshopen. ' +
                'Du kan även välja vilka \nprodukter som ska vara toppsäljare ' +
                'genom att trycka på stjärnan i produktlistan.'}
        />

      <div id="container">
          <ProductMenu showProductTable={this.showProductTable.bind(this)} />
          { this.state.showProductTable? <ProductTable param={this.props.param} /> : ''}
        </div>
      </div>
    )
  }
}
