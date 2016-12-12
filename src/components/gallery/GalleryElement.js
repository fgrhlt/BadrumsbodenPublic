import React, { Component } from 'react'

export default class GalleryElement extends Component {

  render() {

    return (
      <figure>
        <img src={this.props.item} alt="" />
      </figure>
    )
  }
}
