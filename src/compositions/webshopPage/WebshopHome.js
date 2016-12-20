import React, { Component } from 'react'
import axios from 'axios'

import Campaign from '../../components/webshop/Campaign'
import TopSellers from '../../components/webshop/topSellers/TopSellers'
import Banner from '../../components/webshop/Banner'
import Features from '../../components/webshop/Features'

export default class WebshopHome extends Component {

  componentWillMount() {

    this.state = {
      banner: [],
      campaign: [],
      starred: []
    }

    this.fetchDataBanner()
    this.fetchDataCampaign()
    this.fetchDataStarred()
    window.scrollTo(0,0)
  }

  fetchDataBanner() {
    axios.get('/campaign/banner')
    .then(function (response) {
      this.setState({
        banner: response.data[0]
      })
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    })
  }

  fetchDataCampaign() {
    axios.get('/campaign/campaign')
    .then(function (response) {
      this.setState({
        campaign: response.data[0]
      })
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    })
  }

  fetchDataStarred() {
    axios.get('/products/starred/true')
    .then(function (response) {
      this.setState({
        starred: response.data
      })
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    })
  }

  render() {
    const { banner, campaign, starred } = this.state

    return (
      <div>
        <Campaign item={ campaign }/>
        <TopSellers items={ starred }/>
        <Banner item={ banner }></Banner>
        <Features></Features>
      </div>
    )
  }
}
