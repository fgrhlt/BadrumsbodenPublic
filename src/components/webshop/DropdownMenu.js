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
    fetchFirebaseData('categories2', 'parent')
  }

  componentWillReceiveProps(nextProps) {
    const { firebaseData } = nextProps
    let categoryItems = firebaseData['categories2'] ? firebaseData['categories2'].items : []
    let mainCategories = []
    let allCategories = {}

    categoryItems.map( (item) => {
      // Get all the main allCategories
      if(item.parent == 0)
      {
        mainCategories.push(item.key)
        allCategories[item.key] = []
      }
      // Get all the suballCategories
      else {
        mainCategories.map((category) => {
          if(item.parent == category) {
            allCategories[category].push(item.key)
          }
        })
      }
    })

    this.state = {
      categories: allCategories
    }
  }

  clickHandler(e) {
    let category = e.target.parentNode.id+'/'
    let category2 = e.target.id

    if (!category2=='') {
      browserHistory.push('/webshop/'+category2)
    }else {
      let subcategory = e.target.textContent
      subcategory = replaceSpecialCharactersURLs(subcategory)
      browserHistory.push('/webshop/'+category+subcategory)
    }
  }

  renderDivs(subcatItems) {
  /*  let list = this.state[subcatItems].map( (item, key) => {
                return <div key={key}>{item.key}</div>
              })
    return list*/
  }

  render() {
    const paramCategory = this.props.params.category
    const { categories } = this.state
    console.log("state", categories)
    return (
      <div id="menu" onClick={this.clickHandler.bind(this)}>
        {Object.keys(categories).map(function(category, index) {
          return
            <div id={replaceSpecialCharactersURLs(category)} className={paramCategory==category ? 'active' : ''} key={index}>
              {category}
              <section id={replaceSpecialCharactersURLs(category)}>
                {categories[category].map(function(subCategory, index) {
                  return <div key={index}>{subCategory}</div>
                })}
              </section>
            </div>
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log("mapstate", state)
  return {
    firebaseData: state.firebaseReducer.firebaseData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(firebaseActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DropdownMenu)
