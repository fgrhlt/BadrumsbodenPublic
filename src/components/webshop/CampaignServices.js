import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { createLineBreak } from '../../utils/Utils'
import axios from 'axios'
require('../../styles/_webshopPage/campaign.css')

export default class CampaignServices extends Component {

  onClick() {
    this.fetchProduct(this.props.item.articleNr)
  }

  fetchProduct(articleNr) {
    axios.get('/products/articleNr/'+articleNr)
    .then(function (response) {
      const { data } = response
      const { category, subcategory, articleNr } = data
      browserHistory.push('/webshop/'+category+'/'+subcategory+'/I/I/'+articleNr)
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    })
  }

  render() {
    const { item } = this.props
    const { url, heading, description, color } = item

    return (
      <div id="campaign" style={{ margin: '20px 0 20px 0', backgroundImage: 'url(' + url + ')'}}>
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
