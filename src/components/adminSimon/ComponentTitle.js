import React, { Component } from 'react'

require('styles/_adminSimon/ComponentTitle.css')

export default class ComponentTitle extends Component {
  /* Creates a <br> tag where there suppose to be a line break */
  createLineBreak(text) {
    var formattedText = []
    {text.split("\n").map(function(item, i) {
        formattedText.push(<span key={i}>{item}<br/></span>)
    })}
    return formattedText
  }

  render() {
    return (
      <div id="componentTitle">
        <div>
          <h2>{this.props.title}</h2>
        </div>

        <div>
          <p>
            {this.createLineBreak(this.props.text)}
          </p>
        </div>
      </div>
    )
  }
}
