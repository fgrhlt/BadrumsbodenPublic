import React, { Component } from 'react'
import ProductElements from './ProductElements'
import SubCategoryList from './SubCategoryList'

import { browserHistory } from 'react-router'

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
  }

  componentWillReceiveProps(nextProps) {
    const { params, firebaseData } = nextProps
    const { subcategory, category } = params

    this.setState({
      productItem: firebaseData.products ? firebaseData.products.items[0] : [],
    })
  }

  clickedBuyBtn() {
    this.props.actions.shoppingcartActions.addToShoppingcart(this.state.productItem, this.refs.quantity.value)
  }

  clickHandler(category, subcategory) {
    if ( typeof(subcategory) === 'string') {
      browserHistory.push('/webshop/'+category+'/'+subcategory)
    }else {
      browserHistory.push('/webshop/'+category)
    }
  }

  render() {
    const { productItem, subcatItems } = this.state
    const { price, description, url, productName, category, subcategory } = productItem
    let styles = {paddingLeft: 10}

    return (
      <div>
      <span id="1" onClick={this.clickHandler.bind(this, category)} style={styles}>{category} ></span>
      <span id="2" onClick={this.clickHandler.bind(this, category, subcategory)} style={styles}>{subcategory} ></span>
      <span id="3" style={styles}>{productName}</span>

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
