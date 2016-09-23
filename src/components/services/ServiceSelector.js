import React, { Component } from 'react'
require('styles/_servicesPage/serviceSelector2.css')

export default class ServiceSelector extends Component {

  handleClick(e) {
    let leftService = document.getElementById('leftService')
    let leftServiceExpanded = document.getElementById('leftServiceExpanded')
    let leftServiceMinimized = document.getElementById('leftServiceMinimized')

    let rightService = document.getElementById('rightService')
    let rightServiceExpanded = document.getElementById('rightServiceExpanded')
    let rightServiceMinimized = document.getElementById('rightServiceMinimized')

    if (leftService.contains(e.target)) {
      console.log('leftService');
      leftService.style.display = 'none'
      leftServiceExpanded.style.display = 'inline'
      leftServiceMinimized.style.display = 'none'

      rightService.style.display = 'none'
      rightServiceExpanded.style.display = 'none'
      rightServiceMinimized.style.display = 'inline'
    }
    else if (leftServiceMinimized.contains(e.target)) {
      console.log('leftServiceMinimized');
      leftService.style.display = 'inline'
      leftServiceExpanded.style.display = 'none'
      leftServiceMinimized.style.display = 'none'

      rightService.style.display = 'inline'
      rightServiceExpanded.style.display = 'none'
      rightServiceMinimized.style.display = 'none'
    }
    else if (rightService.contains(e.target)) {
      console.log('rightService');
      leftService.style.display = 'none'
      leftServiceExpanded.style.display = 'none'
      leftServiceMinimized.style.display = 'inline'

      rightService.style.display = 'none'
      rightServiceExpanded.style.display = 'inline'
      rightServiceMinimized.style.display = 'none'
    }
    else if (rightServiceMinimized.contains(e.target)) {
      console.log('rightServiceMinimized');
      leftService.style.display = 'inline'
      leftServiceExpanded.style.display = 'none'
      leftServiceMinimized.style.display = 'none'

      rightService.style.display = 'inline'
      rightServiceExpanded.style.display = 'none'
      rightServiceMinimized.style.display = 'none'
    }
  }

  expandDiv() {
    this.props.toggleDiv(true)
  }

  render() {
    var containerStyle = {
      backgroundImage: 'url(assets/images/services/service_bg.jpg)',
    }

    return (
      <div className="serviceSelector" style={containerStyle}>

        <div className="service" id="leftService" onClick={this.handleClick.bind(this)}>
          <div className="expandArrow">
            <img src="assets/arrows/expandArrowRight.svg"></img>
          </div>

          <div className="innerContainer">
            <figure id="figureLeft" />
            <h2>Badrumsrenovering</h2>
            <h3>
              Låt våra badrumsproffs med lång erfarenhet
              utföra din badrumsrenovering. Klicka och läs mer!
            </h3>
          </div>

          <div className="border" id="borderLeft"/>
        </div>

        <div className="serviceExpanded" id="leftServiceExpanded" onClick={this.handleClick.bind(this)}>
          <div className="expandArrow">
            <img src="assets/arrows/expandArrowRight.svg"></img>
          </div>

          <div className="innerContainer" onClick={this.expandDiv.bind(this)}>
            <figure id="figureLeft" />
            <h2>Badrumsrenovering</h2>
            <h3>
              Låt våra badrumsproffs med lång erfarenhet
              utföra din badrumsrenovering. Klicka och läs mer!
            </h3>
          </div>

          <div className="border" id="borderLeft"/>
        </div>

        <div className="serviceMinimized" id="leftServiceMinimized" onClick={this.handleClick.bind(this)}>
          <div id="expandArrow">
            <img src="assets/arrows/expandArrowRight.svg"></img>
          </div>
        </div>


        <div className="service" id="rightService" onClick={this.handleClick.bind(this)}>
          <div className="expandArrow">
            <img src="assets/arrows/expandArrowLeft.svg"></img>
          </div>

          <div className="innerContainer">
            <figure id="figureRight"/>
            <h2>VVS</h2>
            <h3>
              Låt våra badrumsproffs med lång erfarenhet
              utföra din badrumsrenovering. Klicka och läs mer!
            </h3>
          </div>

          <div className="border" id="borderRight"/>
        </div>

        <div className="serviceExpanded" id="rightServiceExpanded" onClick={this.handleClick.bind(this)}>
          <div className="expandArrow">
            <img src="assets/arrows/expandArrowLeft.svg"></img>
          </div>

          <div className="innerContainer">
            <figure id="figureRight"/>
            <h2>VVS</h2>
            <h3>
              Låt våra badrumsproffs med lång erfarenhet
              utföra din badrumsrenovering. Klicka och läs mer!
            </h3>
          </div>

          <div className="border" id="borderRight"/>
        </div>

        <div className="serviceMinimized" id="rightServiceMinimized" onClick={this.handleClick.bind(this)}>
          <div id="expandArrow">
            <img src="assets/arrows/expandArrowLeft.svg"></img>
          </div>
        </div>
      </div>
    )
  }
}
