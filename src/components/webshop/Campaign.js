import React, { Component } from 'react'
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
    description: items[0].description
  })
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
            <button className="btn greenButton">Till erbjudande</button>
          </div>
        </div>
      </div>
    )
  }
}
