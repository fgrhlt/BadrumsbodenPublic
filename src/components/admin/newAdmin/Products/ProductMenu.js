import React, { Component } from 'react'

require('styles/_adminSimon/_products/productMenu.css')

/* CategoryItem is the main category, which contains sub categories in it */
class CategoryItem extends Component {
  componentWillMount() {
    this.state = {clicked: false}
  }
  handleClick() {
    this.setState({clicked:!this.state.clicked})
  }

  /* This class contains a heading, a edit-figure and all the sub-menu-items */
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

/* SubListItem is the sub-categories, replace with real database code later. */
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
    /* Contains all the product menu items from the db */
    this.state = {
      categories: [
        'Badrumsinredning',
        'Dusch & badkar',
        'Annat'
      ]
    }
  }

  render() {
    /* Spits out all the product menu's and then a yellow menu item with the top-sellers */
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
