import React, { Component } from 'react'

require('../../styles/_webshopPage/banner.css')

export default class Banner extends Component {

  render() {
    const { item } = this.props
    const { heading, blueHeading, description } = item
    return (
      <div id="banner">
        <div>
          <h2>{heading || ''}<span>{ blueHeading || ''}</span></h2>
          <p>{description || ''}</p>
        </div>
      </div>
    )
  }
}
