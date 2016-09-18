import React, { Component } from 'react'
require('styles/_webshopPage/campaign.css')

export default class Campaign extends Component {

componentWillMount() {
  this.state = {
    url: ''
  }
}

componentWillReceiveProps(nextProps) {
  const { item } = nextProps

  this.setState({
    url: nextProps.items[0].url,
    title: nextProps.items[0].title,
    description: nextProps.items[0].description
  })
}

  render() {
    const { url, title, description } = this.state

    return (
      <div id="campaign" style={{backgroundImage: 'url(' + this.state.url + ')'}}>
        <section>
          <h1>{title}</h1>
          <p>
            {description}
          </p>
        </section>
        <button className="btn greenButton">Till erbjudande</button>
      </div>
    )
  }
}
