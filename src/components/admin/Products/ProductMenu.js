import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { replaceSpecialCharactersURLs } from '../../../utils/Utils'
import axios from 'axios'

require('../../../styles/_admin/_products/productMenu.css')

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
        </div>
        {this.state.clicked ? <SubListItems showProductTable={this.props.showProductTable} categories={this.props} url={this.props.url} param={this.props.param}/> : ''}
      </div>
    );
  }
}

class SubListItems extends Component {
  handleClick(subcategory, category) {
    browserHistory.push('/admin/webshop/produkter/' + category + '/' + subcategory)
    this.props.showProductTable()
  }

  render() {
    let category = this.props.url
    let subcat = this.props.param.subcategory
    return (
      <div>
        <ul>
          {this.props.categories.subCategories.map(function(subcategory, i) {
            return (
              <li
                key={i}
                onClick={this.handleClick.bind(this, subcategory.item, category)}
                className={subcat == subcategory.item ? 'active' : ''}>{subcategory.name}</li>
          )}, this)}
        </ul>
      </div>
    );
  }
}

export default class ProductMenu extends Component {
  componentWillMount() {
    this.state = {
      categories: {},
    }

    this.fetchData()
  }

  fetchData() {
    axios.get('/categories')
    .then(function (response) {
      let categoryItems = response.data[0]
      let mainCategories = []
      let allCategories = {}

      // for every item from the database (all categories)
      for (var item in categoryItems) {
        let objItem = categoryItems[item]
        // Get all the main categories
        if(objItem.parent == 0) {
          mainCategories.push(item)
          allCategories[item] = {
            "name": objItem.name,
            "subcategories": []
          }
        }
      }
      // for every item in the database again, get all subcategories
      for (var item in categoryItems) {
        let objItem = categoryItems[item]
        mainCategories.map((category) => {
          if(objItem.parent == category) {
            let subcat = {}
            subcat.item = item
            subcat.name = objItem.name
            allCategories[category]["subcategories"].push(subcat)
          }
        })
      }

      //main categories and subcategories are now in state
      this.setState({
        categories: allCategories
      })
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    })
  }

  handleClick() {
    browserHistory.push('/admin/webshop/produkter/toppsaljare/allatoppsaljare')
    this.props.showProductTable()
  }

  render() {
    const { categories } = this.state
    const { showProductTable, param } = this.props
    return (
      <div id="productMenu">
        {
          Object.keys(categories).map(function(category, index) {
            return <CategoryItem key={index} name={categories[category].name} url={category} subCategories={categories[category].subcategories} showProductTable={showProductTable} param={param}/>
          })
        }
        <div>
          <div className="listHead" onClick={this.handleClick.bind(this)}>
            <div>
              Toppsäljare
            </div>
          </div>
        </div>
      </div>
    )
  }
}
