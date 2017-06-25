import React, { Component } from 'react'
import SubCategoryList from './SubCategoryList'
import axios from 'axios'
import { browserHistory } from 'react-router'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../../actions/firebaseActions'
import * as shoppingcartActions from '../../../actions/shoppingcartActions'

require('firebase/database')
require('../../../styles/_webshopPage/productView.css')

class Product extends Component {

  componentWillMount() {
    const { params } = this.props
    const { product } = params

    this.state = {
      productItem: [],
      subcatItems: [],
      variantsArray: [],
      showDropdown: false,
      showBuyBtn: true,
      firstLoad: true
    }

    this.fetchProduct(product)
  }

  fetchProduct(articleNr) {
    axios.get('/products/articleNr/'+articleNr)
    .then(function (response) {
      this.setState({
        productItem: response.data,
        itemName: response.data.productName
      },
      ()=> {
        if (response.data.hasVariants){
          this.fetchVariants(response.data.articleNr)
        }
      })
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    })
  }

  fetchVariants(articleNr) {
    axios.get('/products/variantOf/'+articleNr)
    .then(function (response) {
      let responseData = response.data

      responseData.sort((a, b) => {
        if (a.articleNr < b.articleNr) {
          return -1;
        }
        if (a.articleNr > b.articleNr) {
          return 1;
        }
        // a must be equal to b
        return 0;
      })

      this.setState({
        variantsArray: responseData,
        showDropdown: true,
        showBuyBtn: false
      })
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    })
  }

  selectElement(){
    var variantsArray = this.state.variantsArray

    if (this.state.firstLoad) {
      this.state.firstLoad = false
      let textElement = {productName: 'Välj variant (obligatoriskt)'}
      variantsArray.unshift(textElement)
    }

    var optionList = variantsArray.map((variant) => {
      return <option>{variant.productName}</option>
    })

    return (
      <div>
        <p>Variant</p>
        <select id="selectElement" onChange={this.updateProduct.bind(this)} defaultValue="1">
          {optionList}
        </select>
      </div>
    )
  }

  updateProduct(){
    //Get selected element
    let selectedVariant = document.getElementById('selectElement').value
    let selectedIndex = document.getElementById('selectElement').selectedIndex
    let tempBoolBuyBtn = true

    function matchesName(element) {
      return element.productName == selectedVariant
    }
    //Find matching productvariant
    let variantObject = this.state.variantsArray.find(matchesName)

    //Update state with chosen product
    if (variantObject) {
      var tempProductItem = Object.assign({}, this.state.productItem)

      let newName = this.state.itemName
      if (!selectedIndex=='0') {
        newName = newName+' ('+variantObject.productName+')'
      }else {
        //selectedIndex == 'Välj variant ()'
        tempBoolBuyBtn = false
      }

      let newProduct = {
        articleNr: variantObject.articleNr,
        price: variantObject.price,
        description: tempProductItem.description,
        url: tempProductItem.url,
        productName: newName,
        category: tempProductItem.category,
        subcategory: tempProductItem.subcategory,
        supplier: tempProductItem.supplier
      }

      this.setState({
        productItem: newProduct,
        showBuyBtn: tempBoolBuyBtn
      })
    }
  }

  /* Sends the product to actions and displays a message "product added" with a timeout */
  clickedBuyBtn() {
    this.props.actions.shoppingcartActions.addToShoppingcart(this.state.productItem, this.refs.quantity.value)
    this.setState({
      clickedBuy: !this.state.clickedBuy
    })
    setTimeout(function() {
      this.setState({clickedBuy: !this.state.clickedBuy})
    }.bind(this), 1500);
  }

  clickHandler(category, subcategory) {
    if ( typeof(subcategory) === 'string') {
      browserHistory.push('/webshop/'+category+'/'+subcategory)
    } else {
      browserHistory.push('/webshop/'+category)
    }
  }

  render() {
    const { productItem, subcatItems, showDropdown, showBuyBtn } = this.state
    const { articleNr, price, description, url, productName, category, subcategory, supplier } = productItem
    let styles = {paddingLeft: 10}

    return (
      <div id="productView">
        <div className="breadCrumbs">
          <span id="1" onClick={this.clickHandler.bind(this, category)} style={styles}>{category} ></span>
          <span id="2" onClick={this.clickHandler.bind(this, category, subcategory)} style={styles}>{subcategory} ></span>
          <span id="3" style={styles}>{productName}</span>
        </div>

        <section>
          <figure style={{padding:'5px', backgroundImage: 'url(' + url + ')'}} />
        </section>

        <section>
          <h2>{productName}</h2>
          <p className="boldP">{supplier}</p>
          <p>Artikelnummer: {articleNr}</p>

          <p>{description}</p>
          <p>Antal</p>
          <select ref="quantity" defaultValue="1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
          </select>

          { showDropdown ? this.selectElement() : [] }

          { showBuyBtn ?
            <div>
              <p className="cart">Lägg till i varukorg:</p>
              <div onClick={this.clickedBuyBtn.bind(this)} className="buy-btn">
                <span>{price}:-</span>
                <span><figure /></span>
              </div>
            </div> : []
          }

          <ReactCSSTransitionGroup
            transitionName="fadeIn"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {this.state.clickedBuy ? <p className="added">Produkt tillagd!</p> : ''}
          </ReactCSSTransitionGroup>
        </section>
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
  return {
    actions: {
      firebaseActions: bindActionCreators(firebaseActions, dispatch),
      shoppingcartActions: bindActionCreators(shoppingcartActions, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
