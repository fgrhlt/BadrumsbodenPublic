import React, { Component } from 'react'

require('styles/_servicesPage/serviceSelector.css')
//var $ = require ('jquery')

export default class ServiceSelector extends Component {

componentWillMount() {
  this.state = {
    leftServiceExpanded: false,
    rightServiceExpanded: false
  }
}
  /* Change the parents state with the div that was clicked */
  handleClick(e) {
    let leftService = document.getElementById('leftService')
    let rightService = document.getElementById('rightService')

    //If leftService clicked
    if (leftService.contains(e.target))  {
      if (!this.state.leftServiceExpanded && !this.state.rightServiceExpanded) {
        this.expandLeftDiv()
        this.setState({
          leftServiceExpanded: true,
          rightServiceExpanded: false
        })
      }
      else if (this.state.leftServiceExpanded && !this.state.rightServiceExpanded) {
        this.initalStateDivs()
        this.setState({
          leftServiceExpanded: false,
          rightServiceExpanded: false
        })
        }
      else if (!this.state.leftServiceExpanded && this.state.rightServiceExpanded) {
          this.expandLeftDiv()
          this.setState({
            leftServiceExpanded: true,
            rightServiceExpanded: false
          })
        }
    }
    //If rightService clicked
    else if (rightService.contains(e.target)) {
      if (!this.state.leftServiceExpanded && !this.state.rightServiceExpanded) {
        this.expandRightDiv()
        this.setState({
          leftServiceExpanded: false,
          rightServiceExpanded: true
        })
      }
      else if (!this.state.leftServiceExpanded && this.state.rightServiceExpanded) {
        this.initalStateDivs()
        this.setState({
          leftServiceExpanded: false,
          rightServiceExpanded: false
        })
      }
      else if (this.state.leftServiceExpanded && !this.state.rightServiceExpanded) {
          this.expandRightDiv()
          this.setState({
            leftServiceExpanded: false,
            rightServiceExpanded: true
          })
        }
      }
    }

  expandLeftDiv(){
    let leftService = document.getElementById('leftService')
    let rightService = document.getElementById('rightService')
    let expandArrowRight = document.getElementById('expandArrowRight')
    let expandArrowLeft = document.getElementById('expandArrowLeft')
    let innerContainerRight = document.getElementById('innerContainerRight')
    let innerContainerRight2 = document.getElementById('innerContainerRight2')
    let innerContainerLeft = document.getElementById('innerContainerLeft')
    let innerContainerLeft2 = document.getElementById('innerContainerLeft2')

    rightService.style.width = 'calc(99.9% * 1/6 - (30px - 30px * 1/6))' //lost-column: 1/6
    leftService.style.width = 'calc(99.9% * 5/6 - (30px - 30px * 5/6))' //lost-column: 5/6

    expandArrowRight.style.display = 'inline' // Show arrow
    expandArrowLeft.style.display = 'none' //Hide left arrow

    innerContainerLeft.style.display = 'none' // Show innerContainerLeft
    innerContainerLeft2.style.display = 'inline' // Show innerContainerLeft2

    innerContainerRight.style.display = 'none' // Hide innerContainerRight
    innerContainerRight2.style.display = 'none' // Hide innerContainerRight2
  }

  expandDiv() {
      this.props.toggleDiv(true)
  }

  expandRightDiv() {
    let leftService = document.getElementById('leftService')
    let rightService = document.getElementById('rightService')
    let expandArrowRight = document.getElementById('expandArrowRight')
    let expandArrowLeft = document.getElementById('expandArrowLeft')
    let innerContainerRight = document.getElementById('innerContainerRight')
    let innerContainerRight2 = document.getElementById('innerContainerRight2')
    let innerContainerLeft = document.getElementById('innerContainerLeft')
    let innerContainerLeft2 = document.getElementById('innerContainerLeft2')

    leftService.style.width = 'calc(99.9% * 1/6 - (30px - 30px * 1/6))' //lost-column: 1/6
    rightService.style.width = 'calc(99.9% * 5/6 - (30px - 30px * 5/6))' //lost-column: 5/6

    expandArrowLeft.style.display = 'inline' // Show arrow
    expandArrowRight.style.display = 'none' //Hide left arrow

    innerContainerRight.style.display = 'none' // Show innerContainerRight
    innerContainerRight2.style.display = 'inline' // Show innerContainerRight2

    innerContainerLeft.style.display = 'none' // Hide innerContainerLeft
    innerContainerLeft2.style.display = 'none' // Hide innerContainerLeft2
  }

  initalStateDivs() {
    let leftService = document.getElementById('leftService')
    let rightService = document.getElementById('rightService')
    let expandArrowRight = document.getElementById('expandArrowRight')
    let expandArrowLeft = document.getElementById('expandArrowLeft')
    let innerContainerRight = document.getElementById('innerContainerRight')
    let innerContainerRight2 = document.getElementById('innerContainerRight2')
    let innerContainerLeft = document.getElementById('innerContainerLeft')
    let innerContainerLeft2 = document.getElementById('innerContainerLeft2')

    rightService.style.width = 'calc(99.9% * 1/2 - (30px - 30px * 1/2))' //lost-column: 1/6
    leftService.style.width = 'calc(99.9% * 1/2 - (30px - 30px * 1/2))' //lost-column: 1/6

    expandArrowRight.style.display = 'none' // Show arrow
    expandArrowLeft.style.display = 'none' //Hide left arrow

    innerContainerLeft.style.display = 'inline' // Show innerContainerLeft
    innerContainerLeft2.style.display = 'none' // Show innerContainerLeft2

    innerContainerRight.style.display = 'inline' // Hide innerContainerRight
    innerContainerRight2.style.display = 'none' // Hide innerContainerRight2

  }

  toggleBoth() {
    this.setState({
      rightServiceExpanded: !this.state.rightServiceExpanded,
      leftServiceExpanded: !this.state.leftServiceExpanded
    })
  }
  render() {
    console.log(this.state.leftServiceExpanded, this.state.rightServiceExpanded);
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

          <div onClick={this.expandDiv.bind(this)} id="innerContainerLeft2">
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
