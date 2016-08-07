import React, { Component } from 'react'

import GalleryElement from './GalleryElement'

export default class GalleryElements extends Component {

  render() {

    return (
      <ul>
        {this.props.items.map( (item) => {
          return <GalleryElement key={item.key} item={item}/>
        })}
      </ul>
    )
  }
}
