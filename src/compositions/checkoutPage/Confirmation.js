import React, { Component } from 'react'
import axios from 'axios'
import { browserHistory } from 'react-router'
import cookie from 'react-cookie'
require('styles/_checkoutPage/confirmation.css')

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as shoppingcartActions from '../../actions/shoppingcartActions'

class Confirmation extends Component {

  componentWillMount() {
    window.scrollTo(0, 0)
    this.fetchShoppingcartProducts()
  }

  fetchShoppingcartProducts() {
    let cookies = []
    Object.keys(cookie.select(/^product.*/i)).forEach(name => cookies.push((cookie.load(name))))

    this.setState({ cookies }, () => {
        this.deleteProducts()
    })
  }

  deleteProducts() {
    const { shoppingcartActions } = this.props
    const { deleteProduct, updateSummary } = shoppingcartActions
    let cookies = this.state.cookies

    cookies.map(cookie => {
      deleteProduct(cookie.articleNr)
    })
    updateSummary(undefined, 'reset')
  }

  handleClick() {
    browserHistory.push('/webshop')
  }

  render() {
    return (
      <div id="checkout">
        <section>
          Dina uppgifter är trygga, säkra och krypterade.<br /><br />

          <h4>Kontakt</h4>
          Telefon: 090-13 13 04<br/>
          Vardagar 11-17<br />
          info@badrumsboden.se<br /><br />

          Vi använder Payson som samarbetspartner vid betalningar. <br />
          Payson erbjuder en full service vid lagring av adressuppgifter och kontokort.<br /><br />
          Känn dig säker med Payson!
        </section>

        <section id="payConfirmation">
          <h2>Tack för ditt köp!</h2>
            <p>
              Snart kommer en orderbekräftelse skickas till din mail med information om din order.<br />
              Din betalning är registrerad och behandlad av Payson.
            </p><br />
            Vid problem kontakta oss på info@badrumsboden.se<br />

            <div className="circle">
              <figure />
            </div>
            <a onClick={this.handleClick.bind(this)}>&#8592; Tillbaka till webbshopen</a>
        </section>
      </div>
    )
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation)
