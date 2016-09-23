import React, { Component } from 'react'
import { browserHistory } from 'react-router'

require('styles/_adminSimon/_products/productMenu.css')

/* CategoryItem is the main category, which contains sub categories in it */
class CategoryItem extends Component {
  componentWillMount() {
    this.state = {clicked: false}
  }
  handleClick() {
    this.setState({clicked:!this.state.clicked})
  }

  render() {
    return (
      <div>
        <div className="listHead">
          <div onClick={this.handleClick.bind(this)}>
            {this.props.name}
          </div>
          <figure />
        </div>
        {this.state.clicked ? <SubListItems categories={this.props}/> : ''}
      </div>
    );
  }
}

class SubListItems extends Component {
  handleClick(subcategory, category) {
    browserHistory.push('/admin/webshop/produkter/' + category.toLowerCase() + '/' + subcategory.toLowerCase())
  }

  render() {
    let category = this.props.categories.name
    console.log(category)
    return (
      <div>
        <ul>
          {this.props.categories.subCategories.map(function(subcategory, i) {
            return (
              <li key={i} onClick={this.handleClick.bind(this, subcategory, category)}>{subcategory}</li>
          )}, this)}
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
        {
          name: 'Badrumsinredning',
          subCategories: ['Stolar', 'pallar', 'sängar', 'soffor'],
          key:'1'
        },
        {
          name: 'Dusch och badkar',
          subCategories: ['Duschar', 'badkar', 'stora', 'små'],
          key:'2'
        },
        {
          name: 'Annat',
          subCategories: ['Diverse', 'prylar', 'skotrar', 'katter'],
          key:'3'
        },
      ]
    }
  }

  render() {
    /* Spits out all the product menu's and then a yellow menu item with the top-sellers */
    return (
      <div id="productMenu">
        {this.state.categories.map((category) => {
          return (
          <CategoryItem
            key={category.key}
            name={category.name}
            subCategories={category.subCategories}/>
        )})}

        <div id="yellow">
          <div>
            <h4>Se alla toppsäljare</h4>
          </div>
        </div>
      </div>
    )
  }
}
