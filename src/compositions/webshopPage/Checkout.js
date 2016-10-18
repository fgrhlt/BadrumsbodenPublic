import React, { Component } from 'react'
import axios from 'axios'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as shoppingcartActions from '../../actions/shoppingcartActions'

require('styles/_webshopPage/checkout.css')

class Checkout extends Component {

  componentWillMount() {
    this.state = {
      data: []
    }
  }
  postRequest() {
    // // Send a POST request
    // axios({
    //   method: 'post',
    //   url: 'https://shrouded-plateau-50284.herokuapp.com/payment',
    //   data: {"firstName":"Alfred", "lastName": "Chang", "email": "support@mlab.com"}
    // })

    // Send a POST request
    axios({
      method: 'post',
      url: 'https://shrouded-plateau-50284.herokuapp.com/email',
      data: {"firstName":"Alfred", "lastName": "Chang", "email": "support@mlab.com"}
    })

    // // Send a POST request
    // axios({
    //   method: 'post',
    //   url: 'https://shrouded-plateau-50284.herokuapp.com/contacts',
    //   data: {"firstName":"Alfred", "lastName": "Chang", "email": "support@mlab.com"}
    // })
  }
  testShoppingcart() {
    let productExample = {
      price: 120,
      articleNr: '123123123',
      productName: 'Badkar Stort',
      quantity: 10
    }
    this.props.addToShoppingcart(productExample)
  }
  testShoppingcartQ() {
    this.props.updateQuantity('123123123', 10)
  }
  testShoppingcartR() {
    this.props.deleteProduct('123123123')
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: this.props.shoppingcartReducer
    })
  }

  render() {
    return (
      <div id="checkout">
        <button onClick={this.postRequest.bind(this)} type="button" name="button">Send req</button>
        <button onClick={this.testShoppingcart.bind(this)} type="button" name="button">add product</button>
        <button onClick={this.testShoppingcartQ.bind(this)} type="button" name="button">update q</button>
        <button onClick={this.testShoppingcartR.bind(this)} type="button" name="button">remove product</button>

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
            <div className="item">
              <div className="image">
                <figure style={{backgroundImage:'url(http://placekitten.com/200/300)'}} />
              </div>

              <div className="info">
                <h4>IFÖ</h4>
                <p>Rostfritt stål</p>
                <span>200 cm</span>
              </div>

              <div className="quantity">
                <p>Antal: 1</p>
                <span>-</span>
                <span>+</span>
              </div>

              <div className="price">
                <h4>799:-</h4>
              </div>
            </div>

            <div className="item">
              <div className="image">
                <figure style={{backgroundImage:'url(http://placekitten.com/500/300)'}} />
              </div>

              <div className="info">
                <h4>IFÖ</h4>
                <p>Rostfritt stål</p>
                <span>200 cm</span>
              </div>

              <div className="quantity">
                <p>Antal: 1</p>
                <span>-</span>
                <span>+</span>
              </div>

              <div className="price">
                <h4>799:-</h4>
              </div>
            </div>

            <h4 className="total">Totalt: 1499:-</h4>
          </div>

          <div id="delivery">
            <h2>Leveranssätt</h2>

            <div>
              <input type="radio" />
              <p>Hämta i butik</p>
            </div>

            <div>
              <input type="radio" />
              <p>Postpaket Schenker, 159:-</p>
            </div>
          </div>

          <div id="klarna">
            <img src="../assets/images/webshop/klarna_test.png" />
          </div>
        </section>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    shoppingcartReducer: state.shoppingcartReducer
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(shoppingcartActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
