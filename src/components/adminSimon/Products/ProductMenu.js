import React, { Component } from 'react'

require('styles/_adminSimon/_products/productMenu.css')

class CategoryItem extends Component {
  componentWillMount() {
    this.state = {
      clicked: false,
    }
  }

  handleClick() {
    this.setState({clicked:!this.state.clicked})
  }

  render() {
    return (
      <div>
        <div className="listHead">
          <div onClick={this.handleClick.bind(this)}>
            {this.props.heading}
          </div>
          <figure />
        </div>
        {this.state.clicked ? <SubListItems /> : null}
      </div>
    );
  }
}

class SubListItems extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>Badrumsmöbler</li>
          <li>Badrumsmöbler</li>
          <li>Badrumsmöbler</li>
          <li>Badrumsmöbler</li>
        </ul>
      </div>
    );
  }
}

export default class ProductMenu extends Component {
  componentWillMount() {
    this.state = {
      categories: [
        'Badrumsinredning',
        'Dusch & badkar',
        'Annat'
      ]
    }
  }

  render() {
    return (
      <div id="productMenu">

        {
          this.state.categories.map(function(category, i) {
            return (
              <CategoryItem
                key={i}
                heading={category}
               />
            )
          })
        }

        <div id="yellow">
          <div>
            <h4>Se alla toppsäljare</h4>
          </div>
        </div>

      </div>
    )
  }
}
