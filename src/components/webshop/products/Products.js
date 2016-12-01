import React, { Component } from 'react'
import ProductElements from './ProductElements'
import SubCategoryList from './SubCategoryList'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../../actions/firebaseActions'

require('firebase/database')
require('../../../styles/_webshopPage/products.css')

class Products extends Component {

  componentWillMount() {
    const { params, fetchFirebaseData } = this.props
    const { subcategory, category } = params

    this.state = {
      productItems: [],
      subcatItems: [],
      paginatedProducts: [],
      productsPerPage: 16,
      totalPages: 0,
    }

    if (category=='search') {
      fetchFirebaseData('search', 'productName', subcategory)
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
    const { fetchFirebaseData } = this.props
    let productCat = category=='search' ? 'search' : 'products'

    this.setState({
      productItems: firebaseData.products ? firebaseData.products.items : [],
      subcatItems: firebaseData['categories/'+category] ? firebaseData['categories/'+category].items : [],
      paginatedProducts: firebaseData.products ? firebaseData[productCat].items.slice(0, this.state.productsPerPage) : [],
    })

    if (this.props.params.subcategory !== subcategory) {
      if (category=='search') {
        fetchFirebaseData('search', 'productName', subcategory)
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
            {<ProductElements
              items={paginatedProducts}
              handlePagination={this.handlePagination.bind(this)}
              totalPages={totalPages}
              />}
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
  return bindActionCreators(firebaseActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
