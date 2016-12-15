import React, { Component } from 'react'
import cookie from 'react-cookie'
import { browserHistory } from 'react-router'
import axios from 'axios'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as shoppingcartActions from '../../actions/shoppingcartActions'

require('styles/_checkoutPage/checkout.css')

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
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState!=this.state) {
      this.collectData()
    }
  }

  collectData() {
    let data = this.state.products.map( (product) => {
      return [product.productName, product.articleNr, product.price ,product.quantity]
    })
    data.push(['Frakt', 1, this.state.deliveryCost, 1])

    this.props.collectData(data)
  }

  fetchShoppingcartProducts() {
    let cookies = []
    Object.keys(cookie.select(/^product.*/i)).forEach(name => cookies.push((cookie.load(name))))
    let arr = []

    cookies.forEach(function(item, i) {
      arr[i] = item
      this.fetchData('articleNr', item.articleNr)
    }.bind(this))

    this.setState({
      items: arr,
    })
  }

  fetchData(query, value) {
    axios.get('/products/'+query+'/'+value)
    .then(function (response) {
      let nrOfProducts = Object.keys(this.state.items).length
      let nrOfProductsLoaded = this.state.nrOfProductsLoaded

      if (nrOfProductsLoaded < nrOfProducts) {
      let stateProducts = this.state.products
      let product = Object.assign({}, response.data)

      product['quantity'] = this.getQuantity(product.articleNr)
      stateProducts.push(product)

      this.setState({
        products: stateProducts,
        nrOfProductsLoaded: this.state.nrOfProductsLoaded+1
      })
    }
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    })
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
      this.props.shoppingcartActions.removeFromShoppingcart(product, price)
      this.fetchShoppingcartProducts()
    })
  }

  _updateQuantity(i, product, quantity) {
    let stateProducts = this.state.products
    let newQuantity = parseInt(stateProducts[i].quantity) + parseInt(quantity)

    if (newQuantity>0) {
      this.props.shoppingcartActions.updateQuantity(i, product, quantity)

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

  activateRadioButton(id) {
    let deliveryValue = 0
    if(id == 'schenker') {
      deliveryValue = 159
    }
    this.setState({
      radioButtonValue: id,
      deliveryCost: deliveryValue
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
        <section>
          <h2>Varukorg</h2>

          <div id="cart">
            {this.state.products.map(function(product, i) {
              sum = sum + parseInt(product.price)*parseInt(product.quantity)

            return (
              <div className="item" key={i}>
                <div className="imageInfo" onClick={this.goToProduct.bind(this, product)}>
                  <figure style={{backgroundImage:'url('+product.url+')'}} />

                  <div className="info" onClick={this.goToProduct.bind(this, product)}>
                    <p>{product.supplier}</p>
                    <h4>{product.productName}</h4>
                    <span>Artikelnr: {product.articleNr}</span>
                  </div>
                </div>

                <div className="quantityInfo">
                  <div className="quantity">
                    <p>Antal: {product.quantity}</p>
                    <div onClick={this._updateQuantity.bind(this, i, product, -1)}>-</div>
                    <div onClick={this._updateQuantity.bind(this, i, product, 1)}>+</div>
                  </div>

                  <div className="price">
                    <h3>{product.price}:-</h3>
                  </div>

                  <div className="trash">
                    <figure onClick={this.deleteProduct.bind(this, product, product.price, i)}/>
                  </div>
                </div>
              </div>
            )}, this)}
            <h4 className="total">Produkter: <span>{sum}:-</span></h4>
          </div>

          <h2>Leveranssätt</h2>

          <div id="delivery">
            <div className="optionWrapper">
              <div className="selection" onClick={this.activateRadioButton.bind(this,'store')}>
                <input
                  type="radio"
                  value="store"
                  checked={this.state.radioButtonValue == 'store' ? true : false}
                  onChange={this.handleRadioButton.bind(this)}
                />
                <div>
                  <p><span>Hämta i butik</span>, Umeå</p>
                  <p>0:-</p>
                </div>
              </div>
              <div className="selection" onClick={this.activateRadioButton.bind(this,'schenker')}>
                <input
                  type="radio"
                  value="schenker"
                  checked={this.state.radioButtonValue == 'schenker' ? true : false}
                  onChange={this.handleRadioButton.bind(this)}
                />
                <div>
                  <p><span>Postpaket Schenker</span></p>
                  <p>159:-</p>
                </div>
              </div>
            </div>
            <div className="infoWrapper">
              <div>
                <h4>Leveransinformation</h4>
                {this.state.radioButtonValue == 'store' ?
                <p>
                  Hämta i vår butik på Kabelvägen 8, 901 33 Umeå.<br/><br />
                  <span>Öppettider</span><br/>
                  Vardagar: 11.00 - 17.00<br/>
                  Lördagar: Stängt
                </p>
                :
                <p>
                  Skickas med Schenker, normalt 2-3 arbetsdagar i frakttid
                </p>
                }
              </div>
            </div>
          </div>
          <h4 className="total">Totalt: <span>{sum+parseInt(deliveryCost)}:-</span></h4>
        </section>
      )}
    }

    function mapStateToProps(state) {
      return {
        shoppingcartReducer: state.shoppingcartReducer
      }
    }

    function mapDispatchToProps(dispatch) {
      return {
        shoppingcartActions: bindActionCreators(shoppingcartActions, dispatch)
      }
    }

    export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
