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
    const { params } = this.props
    const { category, subcategory } = params
    let path = 'webshop/produkter/'+category+'/'+subcategory

    this.state = {
      items: []
    }

    switch (category) {
      case 'searchQuery':
        this.props.searchAndFetchFirebaseProducts(subcategory)
        break
      default:
        this.props.fetchFirebaseData(path)
    }

    //this.props.fetchFirebaseData('webshop/menus/badrumsinredning')
  }

  componentWillReceiveProps(nextProps) {
    const { params } = nextProps
    const { category, subcategory } = params
    let path = 'webshop/produkter/'+category+'/'+subcategory

    this.setState({
      items: nextProps.firebaseData[path] ? nextProps.firebaseData[path].items : []
    })

    if (this.props.params.subcategory !== subcategory) {
      this.props.fetchFirebaseData(path)

      this.setState({
        items: nextProps.firebaseData[path] ? nextProps.firebaseData[path].items : []
      })
    }
  }

  render() {
    const { items } = this.state

    return (
      <div>
        <div id="products">
          <section>
            <SubCategoryList />
          </section>

          <section>
            {<ProductElements items={items}/>}
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
