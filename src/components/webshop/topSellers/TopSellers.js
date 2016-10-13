import React, { Component } from 'react'

import ProductElements from './ProductElements'
require('styles/_webshopPage/topSellers.css')

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../actions/firebaseActions'


class TopSellers extends Component {

  componentWillMount() {
    this.state = {
      items: []
    }
    this.props.fetchFirebaseData('webshop/produkter/kampanjer')
  }

  componentWillReceiveProps(nextProps) {
    let path = 'webshop/produkter/kampanjer'

    this.setState({
      items: nextProps.firebaseData[path] ? nextProps.firebaseData[path].items : []
    })
  }

  render() {
    return (
      <div id="topSellers">

        <h4>Toppsäljare</h4>

        <div id="products">
          <div>
            <figure style={{backgroundImage: 'url(assets/images/webshop/img1.jpg)'}} />
            <h4>IFÖ tvättställ AE4</h4>
            <p>Halvfront</p>
            <span>7080:-</span>
          </div>

          {<ProductElements items={items}/>}


{/*          <div>
            <figure style={{backgroundImage: 'url(assets/images/webshop/img2.jpg)'}} />
            <h4>IFÖ Hylla</h4>
            <p>Metallstomme</p>
            <span>599:-</span>
          </div>

          <div>
            <figure style={{backgroundImage: 'url(assets/images/webshop/img3.jpg)'}} />
            <h4>IFÖ blandare FG5</h4>
            <p>Titan</p>
            <span>49:-</span>
          </div>

          <div>
            <figure style={{backgroundImage: 'url(assets/images/webshop/img4.jpg)'}} />
            <h4>IFÖ tvättställ DE4</h4>
            <p>Keramik</p>
            <span>10 000:-</span>
          </div>*/}
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

export default connect(mapStateToProps, mapDispatchToProps)(TopSellers)
