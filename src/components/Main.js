import React, { Component } from 'react'
require('normalize.css/normalize.css')
require('styles/App.css')

export default class AppComponent extends Component {
  render() {
    return (
      <div className="body">
        <div className="header">
          <h1>Hej</h1>
        </div>
      </div>
    )
  }
}

AppComponent.defaultProps = {
}
