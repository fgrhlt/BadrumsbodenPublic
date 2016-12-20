import React, { Component } from 'react'
import ComponentTitle from '../../components/admin/ComponentTitle'
import ProductMenu from '../../components/admin/Products/ProductMenu'
import ProductTable from '../../components/admin/Products/ProductTable'

require('styles/_admin/_products/products.css')

export default class Products extends Component {

componentWillMount() {
  this.state = {
    showProductTable: true
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
                'För att lägga till produkter, klicka på kategorierna i menyn. \n' +
                'Du kan även välja vilka produkter som ska vara toppsäljare ' +
                'genom att trycka på stjärnan i produktlistan.'}
        />

      <div id="container">
          <ProductMenu showProductTable={this.showProductTable.bind(this)} param={this.props.param}/>
          <ProductTable param={this.props.param} />
        </div>
      </div>
    )
  }
}
