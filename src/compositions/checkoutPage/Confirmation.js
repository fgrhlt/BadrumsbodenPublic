import React, { Component } from 'react'
import axios from 'axios'
import { browserHistory } from 'react-router'
import cookie from 'react-cookie'
require('styles/_webshopPage/faq.css')

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

  deleteProduct(articleNr) {
      this.props.shoppingcartActions.removeFromShoppingcart(articleNr, 'reset')
  }

  deleteProducts() {
    let cookies = this.state.cookies

    cookies.map(cookie => {
      this.deleteProduct(cookie.articleNr)
    })
  }

  goBack() {
    browserHistory.push('/webshop/checkout')
  }

  render() {
    return (
      <div id="checkout">
        <section>
          Dina uppgifter är trygga, säkra och krypterade.<br /><br />

          <h4>Kontakt</h4>
          Telefon: 08-72 00 797<br/>
          vardagar 08-12 & 13-16.<br />
          info@badrumsboden.se<br /><br />

          Vi använder Payson som samarbetspartner vid betalningar. <br />
          Payson erbjuder en full service vid lagring av adressuppgifter och kontokort.<br /><br />
          Känn dig säker med Payson!
        </section>

        <section>
          <h2>Tack för ditt köp!</h2>
            Payson kommer att mejla fakturan till din e-postadress när din beställning har <br/>
            skickats från e-butiken. Logga in på Payson för att se aktuell status för din order.
            <br/>
            <br/>

            Observera att orderbekräftelse kommer att skickas separat <br/>
            till dig från e-butiken inom kort.
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
