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
    const { params, actions } = this.props
    const { firebaseActions } = actions
    const { fetchFirebaseData } = firebaseActions
    const { subcategory, category, product } = params

    this.state = {
      productItem: [],
      subcatItems: []
    }

    fetchFirebaseData('products', 'articleNr', product)
    if (category=='search') {
      fetchFirebaseData('categories', 'parent', 0)
    } else {
      fetchFirebaseData('categories', 'parent', category)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { params, firebaseData } = nextProps
    const { subcategory, category } = params

    this.setState({
      productItem: firebaseData.products ? firebaseData.products.items[0] : [],
      subcatItems: firebaseData.categories ? firebaseData.categories.items : [],
    })
  }

  clickedBuyBtn() {
    this.props.actions.shoppingcartActions.addToShoppingcart(this.state.productItem, this.refs.quantity.value)
  }

  render() {
    const { productItem, subcatItems } = this.state
    const { price, description, url, productName } = productItem

    return (
      <div id="productView">
        <section>
          <SubCategoryList subcatItems={subcatItems} />
        </section>

        <section>
          <figure style={{backgroundImage: 'url(' + url + ')'}} />
        </section>

        <section>
          <h2>{productName}</h2>
          <p>{description}</p>
          <p>Antal</p>
          <select ref="quantity" defaultValue="1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
          </select>

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
