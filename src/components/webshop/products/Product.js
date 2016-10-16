import React, { Component } from 'react'
import ProductElements from './ProductElements'
import SubCategoryList from './SubCategoryList'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../../actions/firebaseActions'
import * as shoppingcartActions from '../../../actions/shoppingcartActions'

require('firebase/database')
require('styles/_webshopPage/productView.css')

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
    let data = nextProps.firebaseData.sortedProducts ? nextProps.firebaseData.sortedProducts.items[0] : ''

    this.setState({
      product: {
        price: data.price,
        articleNr: data.articleNr,
        productName: data.productName,
        quantity: this.refs.quantity.value
      }
    })
  }

  clickedBuyBtn() {
    console.log(this.state.product);
    this.props.actions.shoppingcartActions.addToShoppingcart(this.state.product)
  }

  render() {
    const { product } = this.state
    const { price, description, url, productName } = product

    return (
      <div id="productView">
        <section>
          <SubCategoryList />
        </section>

        <section>
          <figure style={{backgroundImage: 'url(' + url + ')'}} />
        </section>

        <section>
          <h2>{productName}</h2>
          <p>{description}</p>
          <span>Antal <input type="text" ref="quantity" value="1"/> </span>
          <div onClick={this.clickedBuyBtn.bind(this)} className="buy-btn">
            <span>{price}:-</span>
            <span><figure /></span>
          </div>
        </section>
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
