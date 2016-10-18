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
      product: [],
      subcatItems: []
    }

    const { params } = this.props
    const { category, subcategory, product } = params
    let folder = 'webshop/produkter/'+category+'/'+subcategory
    let subcategoryPath = 'webshop/produkter/'+category

    this.props.actions.firebaseActions.fetchSubcategories(subcategoryPath)
    this.props.actions.firebaseActions.filterAndFetchFirebaseProducts(folder, product)
  }

  componentWillReceiveProps(nextProps) {
    const { params } = nextProps
    const { category, subcategory } = params
    let subcategoryPath = 'webshop/produkter/'+category

    let data = nextProps.firebaseData.sortedProducts ? nextProps.firebaseData.sortedProducts.items[0] : ''

    this.setState({
      subcatItems: nextProps.firebaseData[subcategoryPath] ? nextProps.firebaseData[subcategoryPath].items : []
    })

    this.setState({
      product: {
        price: data.price,
        articleNr: data.articleNr,
        productName: data.productName,
        quantity: this.refs.quantity.value,
        url: data.url,
        description: data.description
      }
    })
  }

  clickedBuyBtn() {
    this.props.actions.shoppingcartActions.addToShoppingcart(this.state.product)
  }

  render() {
    const { product, subcatItems } = this.state
    const { price, description, url, productName } = product

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
