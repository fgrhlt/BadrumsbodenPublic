import React, { Component } from 'react'

require('styles/_adminSimon/ComponentTitle.css')

export default class ComponentTitle extends Component {

  render() {
    return (
      <div id="componentTitle">
        <div>
          <h2>Produkter</h2>
        </div>

        <div>
          <p>
            Ändra, lägg till och ta bort produkter i webbshopen. Du kan <br/>
            även välja vilka produkter som ska vara toppsäljare.
          </p>
        </div>
      </div>
    )
  }
}
