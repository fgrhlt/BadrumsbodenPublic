import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../actions/firebaseActions'

import Campaign from '../../components/webshop/Campaign'
import TopSellers from '../../components/webshop/topSellers/TopSellers'
import Banner from '../../components/webshop/Banner'
import Features from '../../components/webshop/Features'

require('styles/_webshopPage/webshop.css')

class WebshopHome extends Component {

  componentWillMount() {
    this.props.fetchFirebaseData('campaign')
  }

  render() {
    const { firebaseData } = this.props

    return (
      <div>
        <Campaign items={firebaseData ? firebaseData.campaign.items : []}/>
        <TopSellers></TopSellers>
        <Banner></Banner>
        <Features></Features>
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

export default connect(mapStateToProps, mapDispatchToProps)(WebshopHome)
