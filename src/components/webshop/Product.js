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

    //Find product based on articleNr
    let hej = firebaseData ? firebaseData[category].items : []
    console.log('2', hej);

    return (
      <div>
        <div id="products">
          <section>
            <ul>
              <li>{this.props.params.category}</li>
            </ul>
          </section>

          <section>
              <img style={{}} src="https://placekitten.com/g/200/300" alt="" />

                <div>
                  <h4>title</h4>
                  <p>description</p>
                  <div className="buy-btn">
                    <span>price:- </span>
                    <span>Mer info</span>
                  </div>
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
  return bindActionCreators(firebaseActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
