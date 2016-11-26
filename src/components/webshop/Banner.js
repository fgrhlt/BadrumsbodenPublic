import React, { Component } from 'react'

require('../../styles/_webshopPage/banner.css')

export default class Banner extends Component {

  componentWillMount() {
    this.state = {
      bannerItemBlueheading: '',
      bannerItemHeading: '',
      bannerItemDescription: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const { item  } = nextProps

    this.setState({
      bannerItemBlueheading: item ? item.blueHeading : '',
      bannerItemHeading: item ? item.heading : '',
      bannerItemDescription: item ? item.description : ''
    })
  }

  render() {
    const { bannerItemHeading, bannerItemBlueheading, bannerItemDescription } = this.state
    return (
      <div id="banner">
        <div>
          <h2>{bannerItemHeading} <span>{bannerItemBlueheading}</span></h2>
          <p>{bannerItemDescription}</p>
        </div>
      </div>
    )
  }
}
