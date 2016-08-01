import React, { Component } from 'react'
import { Link } from 'react-router'

require('styles/_landingPage/main.css')

export default class LandingPage extends Component {

  handleClick(e) {
      e.preventDefault();
      console.log('er', this.context);
    }


  render() {
    return (
      <div>
        <h3>Home</h3>
        <button onClick={this.handleClick}>
          Navigate outside of component to About page
        </button>
      </div>
    )
  }
}
