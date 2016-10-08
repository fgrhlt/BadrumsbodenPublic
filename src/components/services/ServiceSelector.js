import React, { Component } from 'react'
require('styles/_servicesPage/serviceSelector.css')

export default class ServiceSelector extends Component {

  componentWillMount() {
    this.state = {
      left: {
        name: '',
        innerContent: '',
        arrow: 'hidden'
      },
      right: {
        name: '',
        innerContent: '',
        arrow: 'hidden'
      }
    }
  }

  /* Toggles the service field back and forth. Depending on where you click
   * the service-divs will get different classnames.
   * Also tells the parent which div was clicked: left or right */
  toggleService(e) {
    let left = this.refs.left
    let right = this.refs.right
    const originalState = {name:'', innerContent: '', arrow: 'hidden'}

    /* If you clicked the left or right box and it's minimized, put it to normal state */
    if((e.currentTarget == left && e.currentTarget.className == 'left minimized')
    || (e.currentTarget == right && e.currentTarget.className == 'right minimized')) {
      this.setState({
        left: {originalState},
        right: {originalState}
      })
    }

    /* If you clicked the left box, expand it and minimize the right */
    else if(e.currentTarget == left) {
      this.setState({
        left: {name: 'left expanded'},
        right: {name: 'right minimized', innerContent:'hidden'}
      })
      /* Send state to parent */
      this.props.displayCalculators('left')
    }

    /* If you clicked the right box, expand it and minimize the left */
    else if(e.currentTarget == right) {
      this.setState({
        right: {name: 'right expanded'},
        left: {name: 'left minimized', innerContent:'hidden'}
      })
      /* Send state to parent */
      this.props.displayCalculators('right')
    }
  }

  /* Tells the parent which service to display: left or right */
  handleClick(userChoice) {
    var element = document.getElementById('features');
    element.scrollIntoView();
  }

  render() {
    let containerStyle = {
      backgroundImage: 'url(assets/images/services/service_bg.jpg)',
    }

    return (
      <div className="serviceSelector" style={containerStyle}>

        <div ref="left" className={this.state.left.name} onClick={this.toggleService.bind(this)}>
          <figure className={this.state.left.arrow} />

          <div className={this.state.left.innerContent}>
            <figure name="wrench" />
            <h2>Badrumsrenovering</h2>
            <h3>
              Låt våra badrumsproffs med lång erfarenhet
              utföra din badrumsrenovering.

              <span onClick={this.handleClick.bind(this)}>Klicka och läs mer!</span>
            </h3>
          </div>
          <div className="border" />
        </div>

        <div ref="right" className={this.state.right.name} onClick={this.toggleService.bind(this)}>
          <figure className={this.state.right.arrow} />

          <div className={this.state.right.innerContent}>
            <figure name="tap"/>
            <h2>VVS</h2>
            <h3>
              Låt våra badrumsproffs med lång erfarenhet
              utföra din badrumsrenovering.
              
              <span onClick={this.handleClick.bind(this)}>Klicka och läs mer!</span>
            </h3>
          </div>
          <div className="border" />
        </div>
      </div>
    )
  }
}
