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
    const { params } = this.props
    const { category, subcategory } = params

    this.props.fetchFirebaseData('webshop/produkter/'+category+'/'+subcategory)
    //this.props.fetchFirebaseData('webshop/menus/badrumsinredning')
  }

  componentWillReceiveProps(nextProps) {
    const { params } = nextProps
    const { category, subcategory } = params

    this.setState({
      firebaseData: nextProps.firebaseData
    })

    if (this.props.params.subcategory !== subcategory) {
      this.props.fetchFirebaseData('webshop/produkter/'+category+'/'+subcategory)

      this.setState({
        firebaseData: nextProps.firebaseData
      })
    }
  }

  render() {
    const { params } = this.props
    const { category, subcategory } = params
    const { firebaseData } = this.state

    // let firebaseDataItems =  firebaseData ? firebaseData['webshop/menus/'+category].items : []
    //
    // var subcategorys = firebaseDataItems.map((key, value) => {
    //                 return <li key={key}>{value}</li>
    //               })

  return (
      <div>
        <div id="products">
          <section>
            <ul> subcategorys </ul>
          </section>

          <section>
            {<ProductElements items={firebaseData ? firebaseData['webshop/produkter/'+category+'/'+subcategory].items : []}/>}
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
