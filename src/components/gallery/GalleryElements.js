import React, { Component } from 'react'

import GalleryElement from './GalleryElement'

export default class GalleryElements extends Component {

  thirdElement0(item, index) {
    let index1 = index
    if (index1 % 3 == 0) {
      return item
    }
  }

  thirdElement1(item, index) {
    let index2 = index + 1
    if (index2 % 3 == 0) {
      return item
    }
  }

  thirdElement2(item, index) {
    let index3 = index + 2
    if (index3 % 3 == 0) {
      return item
    }
  }

  render() {

    return (
      <section>

        <div>
          {this.props.items
            .filter(this.thirdElement0)
            .map( (item) => {
            return <GalleryElement key={item.key} item={item}/>
          })}
        </div>

        <div>
          {this.props.items
            .filter(this.thirdElement1)
            .map( (item) => {
            return <GalleryElement key={item.key} item={item}/>
          })}
        </div>

        <div>
          {this.props.items
            .filter(this.thirdElement2)
            .map( (item) => {
            return <GalleryElement key={item.key} item={item}/>
          })}
        </div>

      </section>
    )
  }
}
