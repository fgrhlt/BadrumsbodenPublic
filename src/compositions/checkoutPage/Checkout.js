import React, { Component } from 'react'
import axios from 'axios'
import cookie from 'react-cookie'
import { browserHistory } from 'react-router'

import Payment from './Payment'
import Modal from 'react-modal'

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
      nrOfProductsLoaded: 0,
      showKlarnaDiv: false,
      modalIsOpen: false
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
    let arr = []

    cookies.forEach(function(item, i) {
      arr[i] = item
      fetchFirebaseData('products', 'articleNr', item.articleNr)
    })

    this.setState({
      items: arr,
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
    let nrOfProducts = Object.keys(this.state.items).length
    let nrOfProductsLoaded = this.state.nrOfProductsLoaded

    //Ifall firebaseData.products har laddats && laddat alla produkter, pusha till state
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
  })//.bind(this)
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
}

handleRadioButton(e) {
  let deliveryValue = 0
  if(e.target.value == 'schenker') {
    deliveryValue = 159
  }
  this.setState({
    radioButtonValue: e.target.value,
    deliveryCost: deliveryValue
  })
}

/* Returns true if there are products in the product array */
checkIfProducts() {
  return this.state.products.length > 0
}

check(element) {
  return element == 12
}

toPayment() {
  let data = this.state.products.map( (product) => {
                  return [product.productName, product.articleNr, product.price ,product.quantity]
                 })
  data.push(['Frakt', 1, this.state.deliveryCost, 1])

  this.setState({
    data,
    showKlarnaDiv: true
    }
  )
  this.openModal()
  //browserHistory.push('/webshop/payment')
}

openModal() {

  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%'
    }
  }

  //https://github.com/reactjs/react-modal

  this.setState({
    modalIsOpen: true
  })
}

closeModal() {
  this.setState({modalIsOpen: false})
}

render() {
  const { products, summary, deliveryCost } = this.state
  let sum = 0

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
      sum = sum + parseInt(product.price)*parseInt(product.quantity)

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

    <div onClick={this.toPayment.bind(this)}>
      Till betalning (öppnas i ny ruta)
    </div>

    <Modal
      isOpen={this.state.modalIsOpen}
      onRequestClose={this.closeModal}
      contentLabel="Example Modal"
      style={{
        content: {
          'top': '20px',
          'height': '800px',
          'width': '950px',
          backgroundColor: 'rgba(255, 255, 255, 1)'
        },
        overlay: {
          'top': '20px',
          'height': '800px',
          'width': '950px',
          backgroundColor: 'rgba(255, 255, 255, 1)'}
         }}>

        <button onClick={this.closeModal.bind(this)}>Stäng ruta</button>
        <Payment data={this.state.data}/>
    </Modal>

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
