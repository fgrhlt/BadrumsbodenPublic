import React, { Component } from 'react'

require('../../styles/_servicesPage/progressBar.css')

export default class ProgressBar extends Component {
  render() {
    let counter = this.props.counter
    return (
      <div id="progressBar">
        <h4>
          {counter == 1 ? 'Dina kontaktuppgifter' : counter <= 4 ? 'Ditt befintliga badrum': 'Ditt nya badrum'}
        </h4>
        <div>
          <div>{counter == 1 ?<figure />: null }</div>
          <p>Steg 1</p>
        </div>

        <div>
          <div>{counter == 2 ?<figure />: null }</div>
          <p>Steg 2</p>
        </div>

        <div>
          <div>{counter == 3 ?<figure />: null }</div>
          <p>Steg 3</p>
        </div>

        <div>
          <div>{counter == 4 ?<figure />: null }</div>
          <p>Steg 4</p>
        </div>

        <div>
          <div>{counter == 5 ? <figure /> : null }</div>
          <p>Steg 5</p>
        </div>

        <div>
          <div>{counter == 6 ? <figure /> : null }</div>
          <p>Steg 6</p>
        </div>
      </div>
    )
  }
}
