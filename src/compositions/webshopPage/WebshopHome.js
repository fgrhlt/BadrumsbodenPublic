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
    //this.props.fetchFirebaseData('campaign')
    this.props.fetchFirebaseData('banner')
    this.props.fetchFirebaseData('products', 'starred', true)

    this.state = {
      campaignItems: [],
      bannerItems: [],
      toppsellerItems: []
    }
  }

  componentWillReceiveProps(nextProps) {

    const { firebaseData } = nextProps
    this.setState({
      campaignItems: firebaseData.campaign ? firebaseData.campaign.items : [],
      bannerItem: firebaseData.banner ? firebaseData.banner.items[0] : [],
      toppsellerItems: firebaseData.products ? firebaseData.products.items : [],
    })
  }

  render() {
    const { campaignItems, toppsellerItems, bannerItem } = this.state

    return (
      <div>
        <Campaign items={ campaignItems }/>
        <TopSellers items={ toppsellerItems }/>
        <Banner item={ bannerItem }></Banner>
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
