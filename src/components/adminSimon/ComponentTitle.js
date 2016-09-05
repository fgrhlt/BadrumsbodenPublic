import React, { Component } from 'react'

require('styles/_adminSimon/ComponentTitle.css')

export default class ComponentTitle extends Component {

  render() {
    return (
      <div id="componentTitle">
        <div>
          <h2>{this.props.title}</h2>
        </div>

        <div>
          <p>
            {this.props.text}
          </p>
        </div>
      </div>
    )
  }
}
