import React, { Component } from 'react'

require('styles/_adminSimon/_products/productMenu.css')

class ListItems extends Component {
  render() {
    return (
      <div>
        <ul>
          <a href="#"><li>Badrumsmöbler</li></a>
          <a href="#"><li>Badrumsmöbler</li></a>
          <a href="#"><li>Badrumsmöbler</li></a>
          <a href="#"><li>Badrumsmöbler</li></a>
        </ul>
      </div>
    );
  }
}

export default class ProductMenu extends Component {
  componentWillMount() {
    this.state = {
      clicked: false
    }
  }
  handleClick() {
    this.setState({clicked:!this.state.clicked})
  }

  render() {
    return (
      <div id="productMenu">

        <div onClick={this.handleClick.bind(this)}>
          <h4>Badrumsinredning</h4>
          {this.state.clicked ? <ListItems /> : null}
        </div>

        <div onClick={this.handleClick.bind(this)}>
          <h4>Dusch & badkar</h4>
          {this.state.clicked ? <ListItems /> : null}
        </div>

        <div onClick={this.handleClick.bind(this)}>
          <h4>Annat</h4>
          {this.state.clicked ? <ListItems /> : null}
        </div>

        <div id="yellow">
          <h4>Se alla toppsäljare</h4>
        </div>

      </div>
    )
  }
}
