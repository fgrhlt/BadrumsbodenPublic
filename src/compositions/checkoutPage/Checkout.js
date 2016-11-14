import React, { Component } from 'react'
import axios from 'axios'
import cookie from 'react-cookie'

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
      totalSum: 0
    }

    this.fetchShoppingcartProducts()
    // axios({
    //  method: 'get',
    //  url: 'localhost:5000',
    // })
  }

  fetchShoppingcartProducts() {
    const { actions } = this.props
    const { firebaseActions } = actions
    const { fetchFirebaseData } = firebaseActions

    let cookies = []

    Object.keys(cookie.select(/^product.*/i)).forEach(name => cookies.push((cookie.load(name))))
    let obj = {}

    cookies.forEach(function(item, i) {
      obj[i] = item
      fetchFirebaseData('products', 'articleNr', item.articleNr)
    })

    this.setState({
      items: obj
    })
  }

  /* Posts a payment request to the node-server with the customers information
  * Amount is always in Öre (swedish cents) 1 kr = 100 öre */
  postRequest = (token) => {
    let amount = 10000
    axios({
      method: 'post',
      url: 'https://shrouded-plateau-50284.herokuapp.com/payment',
      data: {token, amount}
    })
  }

  componentWillReceiveProps(nextProps) {
    const { reducer } = nextProps
    const { firebaseReducer } = reducer
    const { firebaseData } = firebaseReducer

    let stateProducts = this.state.products

    if (firebaseData.products) {
      stateProducts.push(firebaseData.products.items[0])
    }


    this.setState({
      products: stateProducts
    })
  }

  /* Delete a product from this checkout, uses the article number of the product */
  deleteProduct(product, price, i) {

    this.setState({
      products: [],
      items: {}
    }, () => {
      this.props.actions.shoppingcartActions.removeFromShoppingcart(product, price)
      this.fetchShoppingcartProducts()
    }.bind(this))
  }

  updateQuantity(product, quantity) {
    this.props.actions.shoppingcartActions.updateQuantity(product, quantity)
  }

  handleRadioButton(e) {
    let deliveryValue = 0
    if(e.target.value == 'schenker') {
      deliveryValue = 159
    }
    this.setState({
      radioButtonValue: e.target.value,
      totalSum: this.state.summary.sum + deliveryValue
    })
  }

  /* Returns true if there are products in the product array */
  checkIfProducts() {
    return this.state.products.length > 0
  }

  check(element) {
    return element == 12
  }

  render() {
    const { products, summary, totalSum } = this.state
    let sum = 0

    console.log('state',this.state);

    return (
      <div id="checkout">
        <section>
          Dina uppgifter är trygga, säkra och krypterade.<br /><br />

        <h4>Kontakt</h4>
        Telefon: 08-72 00 797<br/>
      vardagar 08-12 & 13-16.<br />
    info@badrumsboden.se<br /><br />

  Vi använder Stripe som samarbetspartner vid betalningar. <br />
Stripe erbjuder en full service vid lagring av adressuppgifter och kontokort.<br /><br />
Känn dig säker med Stripe!
</section>

<section>
  <h2>Varukorg</h2>

  <div id="cart">
    {this.state.products.map(function(product, i) {
      let quantity = this.state.items ? this.state.items[i].quantity : 0
      sum = sum + parseInt(product.price)*parseInt(quantity)

      return (
        <div className="item" key={i}>
          <div className="image">
            <figure style={{backgroundImage:'url('+product.imageUrl+')'}} />
          </div>

          <div className="info">
            <h4>{product.productName}</h4>
            <span>Artikelnr: {product.articleNr}</span>
          </div>

          <div className="quantity">
            <p>Antal: {quantity}</p>
            <span onClick={this.updateQuantity.bind(this, product, -1)}>-</span>
            <span onClick={this.updateQuantity.bind(this, product, 1)}>+</span>
          </div>
          <div className="price">
            <h4>{product.price}:-</h4>
          </div>

          <div className="trash">
            <figure onClick={this.deleteProduct.bind(this, this.state.items[i], product.price, i)}/>
          </div>
        </div>
      )}, this)}
      <h4 className="total">Summa: {sum}:-</h4>
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
        <p>Hämta i butik</p>
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
