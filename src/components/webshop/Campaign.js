import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { createLineBreak } from '../../utils/Utils'
require('../../styles/_webshopPage/campaign.css')

export default class Campaign extends Component {

  componentWillMount() {
    this.state = {
      campaignItem: []
    }
  }

  componentWillReceiveProps(nextProps) {
    const { items } = nextProps

    this.setState({
      campaignItem: items[0] ? items[0] : []
    })
  }

  onClick() {
    const { campaignItem } = this.state
    const { category, subcategory, articleNr } = campaignItem

    browserHistory.push('/webshop/'+category+'/'+subcategory+'/'+articleNr)
  }

  render() {
    const { campaignItem } = this.state
    const { url, heading, description, color } = campaignItem

    return (
      <div id="campaign" style={{backgroundImage: 'url(' + url + ')'}}>
        <div className="lostWrapper">
          <div>
            <h1 className={color}>{heading}</h1>
            <p className={color}>
              {createLineBreak(description || '')}
            </p>
          </div>
          <div>
            <button onClick={this.onClick.bind(this)} className="btn greenButton">Till erbjudande</button>
          </div>
        </div>
      </div>
    )
  }
}
