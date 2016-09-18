import React, { Component } from 'react'
import ProductElements from './ProductElements'
import ProductElement from './ProductElement'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../actions/firebaseActions'

require('firebase/database')
require('styles/_webshopPage/products.css')

class Products extends Component {

  componentWillMount() {
    this.state = {
      items: []
    }

    let category = this.props.params.category
    this.props.fetchFirebaseData(category)
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      items: nextProps
    }
  }

  render() {
    const { params } = this.props
    const { category } = params
    let firebaseData = this.state.items.firebaseData

    return (
      <div>
        <div id="products">
          <section>
            <ul>
              <li>{this.props.params.category}</li>
            </ul>
          </section>

          <section>
            {<ProductElements items={firebaseData ? firebaseData[category].items : []}/>}
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
