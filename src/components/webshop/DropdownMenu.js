import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { replaceSpecialCharactersURLs } from '../../utils/Utils'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../actions/firebaseActions'

require('../../styles/_webshopPage/dropdownMenu.css')
  class DropdownMenu extends Component {

  componentWillMount() {
    const { fetchFirebaseData } = this.props

    this.state = {
      categories: {},
    }
    fetchFirebaseData('allCategories', 'parent')
  }

  componentWillReceiveProps(nextProps) {
    const { firebaseData } = nextProps
    let categoryItems = firebaseData['allCategories'] ? firebaseData['allCategories'].items : []
    let mainCategories = []
    let allCategories = {}

    categoryItems.map( (item) => {
      // Get all the main categories
      if(item.parent == 0)
      {
        mainCategories.push(item.key)
        allCategories[item.key] = {
          "name": item.name,
          "subcategories": []
        }
      }
      // Get all the sub categories
      else {
        mainCategories.map((category) => {
          if(item.parent == category) {
            let subcat = {}
            subcat.item = item.key
            subcat.name = item.name
            allCategories[category]["subcategories"].push(subcat)
          }
        })
      }
    })

    // main categories and subcategories are now in state
    this.setState({
      categories: allCategories
    })
  }

  clickHandler(e) {
    let category = e.target.parentNode.id
    let subcategory = e.target.id

    if (category == 'menu') {
      browserHistory.push('/webshop/'+subcategory)
    }
    else {
      browserHistory.push('/webshop/'+category+'/'+subcategory)
    }
  }

  render() {
    const paramCategory = this.props.params.category
    const { categories } = this.state
    return (
      <div id="menu" onClick={this.clickHandler.bind(this)}>
      {Object.keys(categories).map(function(category, index) {
          return <div id={category} className={paramCategory==category ? 'active' : ''} key={index}>
              {categories[category].name}
              <section id={category}>
                {categories[category]["subcategories"].map(function(subCategory, index) {
                  return <div key={index} id={subCategory.item}>{subCategory.name}</div>
                })}
              </section>
            </div>
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    firebaseData: state.firebaseReducer.firebaseData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(firebaseActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DropdownMenu)
