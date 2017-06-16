import React, { Component } from 'react'
import ProductElements from './ProductElements'
import SubCategoryList from './SubCategoryList'

import axios from 'axios'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../../actions/firebaseActions'

require('firebase/database')
require('../../../styles/_webshopPage/products.css')

class Products extends Component {

  componentWillMount() {
    const { params, fetchFirebaseData, type } = this.props
    const { category, subcategory, supplier, series, product } = params

    this.state = {
      productItems: [],
      subcatItems: [],
      paginatedProducts: [],
      productsPerPage: 16,
      totalPages: 0,
    }
    this.fetchData(category, subcategory, supplier, series, product)
  }

  fetchDataCategory(category) {
    axios.get('/products/category/'+category)
    .then(function (response) {
      this.setState({
        productItems: response.data,
        paginatedProducts: response.data.slice(0, this.state.productsPerPage)
      })
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    })
  }

  fetchDataSubcat(subcategory) {
    axios.get('/products/subcategory/'+subcategory)
    .then(function (response) {
      this.setState({
        productItems: response.data,
        paginatedProducts: response.data.slice(0, this.state.productsPerPage)
      })
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    })
  }

  fetchDataSearch(value) {
    axios.get('/products/search/'+value)
    .then(function (response) {
      this.setState({
        productItems: response.data,
        paginatedProducts: response.data.slice(0, this.state.productsPerPage)
      })
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    })
  }

  fetchDataSupplier(value, value2) {
    axios.get('/products/fetchSupplier/'+value+'/'+value2)
    .then(function (response) {
      this.setState({
        productItems: response.data,
        paginatedProducts: response.data.slice(0, this.state.productsPerPage)
      })
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    })
  }

  fetchDataSeries(value, value2) {
    axios.get('/products/fetchSeries/'+value+'/'+value2)
    .then(function (response) {
      this.setState({
        productItems: response.data,
        paginatedProducts: response.data.slice(0, this.state.productsPerPage)
      })
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    })
  }

  fetchDataCategories() {
    axios.get('/categories')
    .then(function (response) {
      this.setState({
        subcatItems: response.data[0],
      })
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    })
  }

  fetchData(category, subcategory, supplier, series, product) {
    //Searching for single product
    if (category=='search') {
      this.fetchDataSearch(subcategory)
      this.setState({ subcatItems: [] })
    }
    //category
    else if (category && subcategory==undefined) {
      this.fetchDataCategory(category)
      this.fetchDataCategories()
    }
    //subcategory
    else if (subcategory && supplier==undefined) {
      this.fetchDataSubcat(subcategory)
      this.fetchDataCategories()
    }
    //supplier
    else if (supplier && series==undefined) {
      this.fetchDataSupplier(subcategory, supplier)
      this.fetchDataCategories()
    }
    //series
    else if (series) {
      this.fetchDataSeries(supplier, series)
      this.fetchDataCategories()
    }
  }

  componentWillReceiveProps(nextProps) {
    const { params, firebaseData } = nextProps
    const { category, subcategory, supplier, series, product } = params
    let currentCategory = this.props.params.category
    let currentsubcat = this.props.params.subcategory
    let currentsupplier = this.props.params.supplier
    let currentSeries = this.props.params.series
    let currentProduct = this.props.params.product

    //eller om man byter subcategory eller category
    if (currentCategory!=category || currentsubcat!=subcategory || currentsupplier!=supplier
        || currentSeries!=series || currentProduct!=product) {
      this.fetchData(category, subcategory, supplier, series, product)
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
  return {
    type: state.firebaseReducer.type,
    firebaseData: state.firebaseReducer.firebaseData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(firebaseActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
