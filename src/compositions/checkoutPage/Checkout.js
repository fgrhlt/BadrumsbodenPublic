import React, { Component } from 'react'
import axios from 'axios'
import cookie from 'react-cookie'
import { browserHistory } from 'react-router'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../actions/firebaseActions'
import * as shoppingcartActions from '../../actions/shoppingcartActions'

require('styles/_webshopPage/checkout.css')

class Checkout extends Component {

  componentWillMount() {
    this.state = {
      data: [],
      summary: '',
      products: [],
      radioButtonValue: 'store',
      deliveryCost: 0,
      nrOfProductsLoaded: 0
    }

    this.fetchShoppingcartProducts()
    setTimeout(() => {this.collectData()}, 2500) //Tills vidare

  }

  collectData() {
    let data = this.state.products.map( (product) => {
      return [product.productName, product.articleNr, product.price ,product.quantity]
    })
    data.push(['Frakt', 1, this.state.deliveryCost, 1])

    this.props.collectData(data)
  }

  fetchShoppingcartProducts() {
    const { actions } = this.props
    const { firebaseActions } = actions
    const { fetchFirebaseData } = firebaseActions
    let cookies = []

    Object.keys(cookie.select(/^product.*/i)).forEach(name => cookies.push((cookie.load(name))))
    let arr = []

    cookies.forEach(function(item, i) {
      arr[i] = item
      fetchFirebaseData('products', 'articleNr', item.articleNr)
    })

    this.setState({
      items: arr,
    })
  }

  componentWillReceiveProps(nextProps) {
    const { reducer } = nextProps
    const { firebaseReducer } = reducer
    const { firebaseData } = firebaseReducer
    let nrOfProducts = Object.keys(this.state.items).length
    let nrOfProductsLoaded = this.state.nrOfProductsLoaded

    //Ifall firebaseData.products har laddats && inte pushat alla produkter, pusha till state
    if (firebaseData.products && nrOfProductsLoaded < nrOfProducts) {
      let stateProducts = this.state.products
      let product = Object.assign({}, firebaseData.products.items[0])

      product['quantity'] = this.getQuantity(product.articleNr)
      stateProducts.push(product)

      this.setState({
        products: stateProducts,
        nrOfProductsLoaded: this.state.nrOfProductsLoaded+1
      })
    }
  }

  getQuantity(articleNr) {
    let items = this.state.items
    let quantity = ''

    items.find( element => {
      if (element.articleNr==articleNr) {
        quantity = element.quantity
      }
    })
    return quantity
  }

  /* Delete a product from this checkout, uses the article number of the product */
  deleteProduct(product, price, i) {
    let arr = this.state.products
    //Returnera element som inte matchar product.articleNr
    let newArr = arr.filter( element => {
      if (element.articleNr!=product.articleNr) {
        return element
      }
    })

    this.setState({
      products: newArr,
      items: {}
    }, () => {
      this.props.actions.shoppingcartActions.removeFromShoppingcart(product, price)
      this.fetchShoppingcartProducts()
    })
    this.collectData()
  }

  _updateQuantity(i, product, quantity) {
    let stateProducts = this.state.products
    let newQuantity = parseInt(stateProducts[i].quantity) + parseInt(quantity)

    if (newQuantity>0) {
      this.props.actions.shoppingcartActions.updateQuantity(i, product, quantity)

      stateProducts[i].quantity = newQuantity
      this.setState({
        products: stateProducts
      })
    }
    this.collectData()
  }

  handleRadioButton(e) {
    let deliveryValue = 0
    if(e.target.value == 'schenker') {
      deliveryValue = 159
    }

    this.setState({
      radioButtonValue: e.target.value,
      deliveryCost: deliveryValue
    }, () => {
      this.collectData()
    })
  }

  goToProduct(product) {
    const { category, subcategory, articleNr } = product
    browserHistory.push('/webshop/'+category+'/'+subcategory+'/'+articleNr)
  }

  render() {
    const { products, summary, deliveryCost } = this.state
    let sum = 0

    return (
      <div>
        <section>
          <h2>Varukorg</h2>

          <div id="cart">
            {this.state.products.map(function(product, i) {
              sum = sum + parseInt(product.price)*parseInt(product.quantity)

              return (
                <div className="item" key={i}>
                  <div className="image" style={{paddingLeft:'10px', paddingRight:'10px'}} onClick={this.goToProduct.bind(this, product)}>
                    <figure style={{backgroundImage:'url('+product.url+')'}} />
                  </div>

                  <div className="info" onClick={this.goToProduct.bind(this, product)}>
                    <h4>{product.productName}</h4>
                    <span>Artikelnr: {product.articleNr}</span>
                  </div>

                  <div className="quantity">
                    <p>Antal: {product.quantity}</p>
                    <span onClick={this._updateQuantity.bind(this, i, product, -1)}>-</span>
                    <span onClick={this._updateQuantity.bind(this, i, product, 1)}>+</span>
                  </div>
                  <div className="price">
                    <h4>{product.price}:-</h4>
                  </div>

                  <div className="trash">
                    <figure onClick={this.deleteProduct.bind(this, product, product.price, i)}/>
                  </div>
                </div>
              )}, this)}
              <h4 className="total">Summa: {sum+parseInt(deliveryCost)}:-</h4>
            </div>

            <div id="delivery">
              <h2>Leveranssätt</h2>
              <div>
                <input
                  type="radio"
                  value="store"
                  checked={this.state.radioButtonValue == 'store' ? true : false}
                  onChange={this.handleRadioButton.bind(this)}
                  />
                <p>Hämta i butik, 0:-</p>
              </div>

              <div>
                <input
                  type="radio"
                  value="schenker"
                  checked={this.state.radioButtonValue == 'schenker' ? true : false}
                  onChange={this.handleRadioButton.bind(this)}
                  />
                <p>Postpaket Schenker, 159:-</p>
              </div>
            </div>
            </section>
          </div>
        )
      }
    }

    function mapStateToProps(state) {
      return {
        reducer: {
          firebaseReducer: state.firebaseReducer,
          shoppingcartReducer: state.shoppingcartReducer
        }
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

    export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
