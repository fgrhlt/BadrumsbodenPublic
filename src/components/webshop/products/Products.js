import React, { Component } from 'react'
import ProductElements from './ProductElements'
import SubCategoryList from './SubCategoryList'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../../actions/firebaseActions'

require('firebase/database')
require('styles/_webshopPage/products.css')

class Products extends Component {

  componentWillMount() {
    const { params, fetchFirebaseData } = this.props
    const { subcategory, category } = params

    this.state = {
      productItems: [],
      subcatItems: []
    }

    if (category=='search') {
      fetchFirebaseData('products', 'productName', subcategory)
      fetchFirebaseData('categories', 'parent', 0)

    } else if (subcategory=='all') {
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

    this.setState({
      productItems: firebaseData.products ? firebaseData.products.items : [],
      subcatItems: firebaseData.categories ? firebaseData.categories.items : [],
    })

    if (this.props.params.subcategory !== subcategory) {
      if (category=='search') {
        fetchFirebaseData('products', 'productName', subcategory)
        fetchFirebaseData('categories', 'parent', 0)
      } else if (subcategory=='all') {
      fetchFirebaseData('products', 'category', category)
      fetchFirebaseData('categories', 'parent', category)
      } else {
        fetchFirebaseData('products', 'subcategory', subcategory)
        fetchFirebaseData('categories', 'parent', category)
      }
      this.setState({
        productItems: firebaseData.products ? firebaseData.products.items : [],
        subcatItems: firebaseData.categories ? firebaseData.categories.items : [],
      })
    }
  }

  render() {
    const { productItems, subcatItems} = this.state

    return (
      <div>
        <div id="products">
          <section>
            <SubCategoryList subcatItems={subcatItems}/>
          </section>

          <section>
            {<ProductElements items={productItems}/>}
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
