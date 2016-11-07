import React, { Component } from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as shoppingcartActions from '../../actions/shoppingcartActions'

require('styles/_webshopPage/checkout.css')

class Checkout extends Component {

  componentWillMount() {
    const { shoppingcartReducer, shoppingcartActions } = this.props
    this.props.fetchShoppingcart()

    this.state = {
      data: [],
      summary: shoppingcartReducer.summary ? shoppingcartReducer.summary : '',
      products: shoppingcartReducer.products ? shoppingcartReducer.products : '',
      radioButtonValue:"store",
      totalSum: 0,
    }
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
    this.setState({
      data: this.props.shoppingcartReducer,
      summary: nextProps.shoppingcartReducer.summary ? nextProps.shoppingcartReducer.summary : '',
      products: nextProps.shoppingcartReducer.products ? nextProps.shoppingcartReducer.products : '',
      totalSum: this.state.summary.sum ? this.state.summary.sum : 0
    })
    //console.log(this.state.totalSum)
  }
  /* Delete a product from this checkout, uses the article number of the product */
  deleteProduct(articleNr) {
    this.props.deleteProduct(articleNr)
  }
  /* Adds one to the quantity of a product */
  updateQuantityAdd(articleNr) {
    this.props.updateQuantity(articleNr, 1)
  }
  /* Subtracts one from the quantity of the product */
  updateQuantitySubtract(articleNr) {
    this.props.updateQuantity(articleNr, -1)
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
  render() {
    console.log('state', this.state)
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
                    <p>Antal: {product.quantity}</p>
                    <span onClick={this.updateQuantitySubtract.bind(this,product.articleNr)}>-</span>
                    <span onClick={this.updateQuantityAdd.bind(this,product.articleNr)}>+</span>
                  </div>

                  <div className="price">
                    <h4>{product.price}:-</h4>
                  </div>

                  <div className="trash">
                    <figure onClick={this.deleteProduct.bind(this, product.articleNr)}/>
                  </div>
                </div>
            )}, this)}
            <h4 className="total">Summa: {this.state.summary.sum}:-</h4>
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
          <div id="stripe">
            <StripeCheckout
              token={this.postRequest}
              stripeKey="pk_test_fIT3T4pAmisM8mJT3UtcvZEG"
              billingAddress={true}
              amount={this.state.totalSum*100}
              currency="SEK"
              locale="auto"
              >
              <button className="btn greenButton bigButton">Betala med kort</button>
            </StripeCheckout>
            <h4 className="total">Totalt: <span>{this.state.totalSum}:- </span></h4>
          </div>
        </section>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('firebase ', state)
  return {
    shoppingcartReducer: state.shoppingcartReducer
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(shoppingcartActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
