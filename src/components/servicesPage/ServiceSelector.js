import React, { Component } from 'react'

require('styles/_servicesPage/serviceSelector.css')

export default class ServiceSelector extends Component {

  /* Change the parents state with the div that was clicked */
  handleClick(e) {
    const userChoice = e.target.className
    this.props.changeUserChoice(userChoice)
  }

  render() {
    var styleVar = {
      backgroundImage: 'url(assets/images/services/service_bg.jpg)',
    }

    return (
      <div id="serviceSelector" style={styleVar}>
        <div className="left" onClick={this.handleClick.bind(this)}>
          <div>
            <figure />
            <h2>Badrumsrenovering</h2>
            <h3>
              Låt våra badrumsproffs med lång erfarenhet
              utföra din badrumsrenovering. Klicka och läs mer!
            </h3>
          </div>
        </div>

        <div className="right" onClick={this.handleClick.bind(this)}>
          <div>
            <figure />
            <h2>VVS</h2>
            <h3>
              Låt våra badrumsproffs med lång erfarenhet
              utföra din badrumsrenovering. Klicka och läs mer!
            </h3>
          </div>
        </div>
      </div>
    )
  }
}
