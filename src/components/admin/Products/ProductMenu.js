import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import * as firebaseActions from '../../../actions/firebaseActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { replaceSpecialCharactersURLs } from '../../../utils/Utils'

require('../../../styles/_adminSimon/_products/productMenu.css')

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
        {this.state.clicked ? <SubListItems showProductTable={this.props.showProductTable} categories={this.props} url={this.props.url}/> : ''}
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
    return (
      <div>
        <ul>
          {this.props.categories.subCategories.map(function(subcategory, i) {
            return (
              <li key={i} onClick={this.handleClick.bind(this, subcategory.item, category)}>{subcategory.name}</li>
          )}, this)}
        </ul>
      </div>
    );
  }
}

export class ProductMenu extends Component {
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
  handleClick() {
    browserHistory.push('/admin/webshop/produkter/toppsaljare/allatoppsaljare')
    this.props.showProductTable()
  }

  render() {
    const { categories } = this.state
    const { showProductTable } = this.props
    return (
      <div id="productMenu">
        {
          Object.keys(categories).map(function(category, index) {
            return <CategoryItem key={index} name={categories[category].name} url={category} subCategories={categories[category].subcategories} showProductTable={showProductTable} />
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
function mapStateToProps(state) {
  return {
    firebaseData: state.firebaseReducer.firebaseData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(firebaseActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductMenu)
