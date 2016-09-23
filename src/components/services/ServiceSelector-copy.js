import React, { Component } from 'react'

require('styles/_servicesPage/serviceSelector.css')
//var $ = require ('jquery')

export default class ServiceSelector extends Component {

  /* Change the parents state with the div that was clicked */
  handleClick(e) {
    const userChoice = e.target.id

    let leftService = document.getElementById('leftService')
    let rightService = document.getElementById('rightService')
    let expandArrowRight = document.getElementById('expandArrowRight')
    let expandArrowLeft = document.getElementById('expandArrowLeft')
    let innerContainerRight = document.getElementById('innerContainerRight')
    let innerContainerLeft = document.getElementById('innerContainerLeft')

    if (userChoice=='leftService') {
      leftService.style.width = 'calc(99.9% * 5/6 - (30px - 30px * 5/6))'
      rightService.style.width = 'calc(99.9% * 1/6 - (30px - 30px * 1/6))'
      expandArrowRight.style.display = 'inline'
      innerContainerRight.style.display = 'none'
      innerContainerLeft.style.display = 'inline'
      expandArrowLeft.style.display = 'none'
    }

    if (userChoice=='rightService') {
      rightService.style.width = 'calc(99.9% * 5/6 - (30px - 30px * 5/6))'
      leftService.style.width = 'calc(99.9% * 1/6 - (30px - 30px * 1/6))'
      expandArrowRight.style.display = 'none'
      expandArrowLeft.style.display = 'inline'
      innerContainerRight.style.display = 'inline'
      innerContainerLeft.style.display = 'none'
    }
  }

  render() {
    var containerStyle = {
      backgroundImage: 'url(assets/images/services/service_bg.jpg)',
    }

    return (
      <div id="serviceSelector" style={containerStyle}>

        <div id="leftService" onClick={this.handleClick.bind(this)}>
          <div id="expandArrowLeft">
            <img src="assets/arrows/expandArrowRight.svg"></img>
          </div>

          <div id="innerContainerLeft">
            <figure id="figureLeft" />
            <h2>Badrumsrenovering</h2>
            <h3>
              Låt våra badrumsproffs med lång erfarenhet
              utföra din badrumsrenovering. Klicka och läs mer!
            </h3>
          </div>

          <div id="innerContainerLeft2">
            <h3>
              Låt våra badrumsproffs med lång erfarenhet
              utföra din badrumsrenovering. Klicka och läs mer!
              Låt våra badrumsproffs med lång erfarenhet
              utföra din badrumsrenovering. Klicka och läs mer!
              Låt våra badrumsproffs med lång erfarenhet
              utföra din badrumsrenovering. Klicka och läs mer!
            </h3>
          </div>

          <div id="borderLeft"/>
        </div>

        <div id="rightService" onClick={this.handleClick.bind(this)}>
          <div id="expandArrowRight">
            <img src="assets/arrows/expandArrowLeft.svg"></img>
          </div>

          <div id="innerContainerRight">
            <figure id="figureRight"/>
            <h2>VVS</h2>
            <h3>
              Låt våra badrumsproffs med lång erfarenhet
              utföra din badrumsrenovering. Klicka och läs mer!
            </h3>
          </div>

          <div id="innerContainerRight2">
            <h3>
              Låt våra badrumsproffs med lång erfarenhet
              utföra din badrumsrenovering. Klicka och läs mer!
              Låt våra badrumsproffs med lång erfarenhet
              utföra din badrumsrenovering. Klicka och läs mer!
              Låt våra badrumsproffs med lång erfarenhet
              utföra din badrumsrenovering. Klicka och läs mer!
            </h3>
          </div>

          <div id="borderRight"/>
        </div>
      </div>
    )
  }
}
