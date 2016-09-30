import React, { Component } from 'react'
import ProductElements from './ProductElements'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../actions/firebaseActions'
import * as shoppingcartActions from '../../actions/shoppingcartActions'

require('firebase/database')
require('styles/_webshopPage/products.css')

class Product extends Component {

  componentWillMount() {
    this.state = {
      product: []
    }

    const { params } = this.props
    const { category, subcategory, product } = params
    let folder = 'webshop/produkter/'+category+'/'+subcategory

    this.props.actions.firebaseActions.filterAndFetchFirebaseProducts(folder, product)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      product: nextProps.firebaseData.sortedProducts ? nextProps.firebaseData.sortedProducts.items[0] : ''
    })
  }

  clickedBuyBtn() {
    this.props.actions.shoppingcartActions.addToShoppingcart(this.state.product)
  }

  render() {
    const { product } = this.state
    const { price, description, url, productName } = product

    return (
      <div>
        <div id="products">
          <section>
            <ul>
              <li>Hejhej</li>
            </ul>
          </section>

          <section>
            <figure style={{backgroundImage: 'url(' + url + ')'}} />
            <h4>{productName}</h4>
            <p>{description}</p>
            <div onClick={this.clickedBuyBtn.bind(this)} className="buy-btn">
              <span>{price}:-</span>
            </div>
          </section>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    firebaseData: state.firebaseReducer.firebaseData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      firebaseActions: bindActionCreators(firebaseActions, dispatch),
      shoppingcartActions: bindActionCreators(shoppingcartActions, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
