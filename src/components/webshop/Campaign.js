import React, { Component } from 'react'
import { browserHistory } from 'react-router'

require('styles/_webshopPage/campaign.css')

export default class Campaign extends Component {

  componentWillMount() {
    this.state = {
      url: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const { items } = nextProps

    this.setState({
      url: items[0].url,
      title: items[0].title,
      description: items[0].description,
      articleNr: items[0].articleNr,
      category: items[0].category,
      subcategory: items[0].subcategory,
    })
  }

  onClick() {
    const { category, subcategory, articleNr } = this.state
    browserHistory.push('/webshop/'+category+'/'+subcategory+'/'+articleNr)
  }

  render() {
    const { url, title, description } = this.state

    return (
      <div id="campaign" style={{backgroundImage: 'url(' + this.state.url + ')'}}>
        <div className="lostWrapper">
          <div>
            <h1>{title}</h1>
            <p>
              {description}
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
