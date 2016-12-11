import React, { Component } from 'react'
import ProductElements from './ProductElements'
import SubCategoryList from './SubCategoryList'
import { browserHistory } from 'react-router'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../../actions/firebaseActions'

require('firebase/database')
require('../../../styles/_webshopPage/products.css')

class Products extends Component {

  componentWillMount() {
    const { params, fetchFirebaseData, type } = this.props
    const { subcategory, category } = params

    this.state = {
      productItems: [],
      subcatItems: [],
      paginatedProducts: [],
      productsPerPage: 16,
      totalPages: 0,
    }
    this.fetchData(category, subcategory, type)
  }

  fetchData(category, subcategory, type) {
    const { fetchFirebaseData } = this.props

    if (category=='search') {
      fetchFirebaseData('search', type, subcategory)
      fetchFirebaseData('categories', 'parent', 0)
    }
    else if (subcategory==undefined) {
      fetchFirebaseData('products', 'category', category)
      fetchFirebaseData('categories', 'parent', category)
    }
    else {
      fetchFirebaseData('products', 'subcategory', subcategory)
      fetchFirebaseData('categories', 'parent', category)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { params, firebaseData } = nextProps
    const { subcategory, category } = params
    const { fetchFirebaseData, type } = this.props
    let productCat = category=='search' ? 'search' : 'products'
    let currentCategory = this.props.params.category

    this.setState({
      productItems: firebaseData[productCat] ? firebaseData[productCat].items : [],
      subcatItems: firebaseData['categories/'+category] ? firebaseData['categories/'+category].items : [],
      paginatedProducts: firebaseData[productCat] ? firebaseData[productCat].items.slice(0, this.state.productsPerPage) : [],
    })

    //om man är inne på en produkt och söker eller om man skiftar typ
    if (currentCategory!=category && category=='search' || nextProps.type != type) {
      this.fetchData(category, subcategory, nextProps.type)
      return
    }

    //om man byter subcategory
    if (this.props.params.subcategory !== subcategory) {
      this.fetchData(category, subcategory, type)
    }
  }

  handlePagination = (data) => {
    let perPage = this.state.productsPerPage
    let offset = Math.ceil(data.selected * perPage)
    let limit = offset + perPage

    let pagProductArr = this.state.productItems.slice(offset, limit)

    this.setState({
      paginatedProducts: pagProductArr
    })
  }

  render() {
    const { productItems, productsPerPage, paginatedProducts, subcatItems} = this.state
    let totalPages = Math.ceil(productItems.length / productsPerPage)

    return (
      <div>
        <div id="products">
          <section>
            <SubCategoryList subcatItems={subcatItems} params={this.props.params}/>
          </section>

          <section>
            {paginatedProducts.length>0? <ProductElements
              items={paginatedProducts}
              handlePagination={this.handlePagination.bind(this)}
              totalPages={totalPages}
              />: 'Tyvärr hittades inga produkter!'}
          </section>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('state.firebaseReducer.firebaseData',state.firebaseReducer.firebaseData);
  return {
    type: state.firebaseReducer.type,
    firebaseData: state.firebaseReducer.firebaseData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(firebaseActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
