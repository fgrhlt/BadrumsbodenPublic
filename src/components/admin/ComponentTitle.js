import React, { Component } from 'react'
import {createLineBreak} from '../../utils/Utils'

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
            {createLineBreak(this.props.text)}
          </p>
        </div>
      </div>
    )
  }
}