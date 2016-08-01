import React, { Component } from 'react'
import { Link } from 'react-router'

require('styles/_landingPage/main.css')

export default class LandingPage extends Component {
  render() {
    return (
        <div>
          <h1>Hej!</h1>
          {this.props.children}
          <Link to="gallery">To gallery</Link>
        </div>
    )
  }
}
