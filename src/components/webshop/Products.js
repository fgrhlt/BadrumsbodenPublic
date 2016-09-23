import React, { Component } from 'react'
import ProductElements from './ProductElements'

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
    category = 'aggregat' //TEST
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
    let category2 = 'aggregat' // TEST

    return (
      <div>
        <div id="products">
          <section>
            <ul>
              <li>{category}</li>
            </ul>
          </section>

          <section>
            {<ProductElements items={firebaseData ? firebaseData[category2].items : []}/>}
          </section>

        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  console.log(state);
  return {
    firebaseData: state.firebaseReducer.firebaseData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(firebaseActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
