import React, { Component } from 'react'

require('styles/_servicesPage/progressBar.css')

export default class ProgressBar extends Component {
  render() {

    return (
      <div id="progressBar">
        <div>
          <div><figure /></div>
          <p>Steg 1</p>
        </div>

        <div>
          <div><figure /></div>
          <p>Steg 2</p>
        </div>

        <div>
          <div><figure /></div>
          <p>Steg 3</p>
        </div>

        <div>
          <div><figure /></div>
          <p>Steg 4</p>
        </div>

        <div>
          <div><figure /></div>
          <p>Steg 5</p>
        </div>
      </div>
    )
  }
}
