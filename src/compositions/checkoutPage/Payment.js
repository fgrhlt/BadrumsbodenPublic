import React, { Component } from 'react'
import axios from 'axios'
import { browserHistory } from 'react-router'
require('styles/_webshopPage/faq.css')

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Payment extends Component {

  componentWillMount() {
    this.state = {
      url: '',
      status: 'Laddar...'
    }
    this.postReq(this.props.paymentReducer.data)
  }

  postReq(data) {
    axios.post('/payment', { data })
    .then(function (response) {
      //Extracting the URL
      let url = response.data
      let splittedUrl = url.split(' ')
      let formattedURL = splittedUrl[3].slice(5, -15)

      this.setState({ url: formattedURL, status: null })
    }.bind(this))
    .catch(function (error) {
      console.log(error);
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
          <h2>Betalning</h2>
          {this.state.status? this.state.status : ''}
          <iframe
            frameBorder="0"
            id="paysonIframe"
            style={{'height':'600px', 'width': '800px'}}
            src={this.state.url}>
          </iframe>

          <div className="paysonBtnBack" onClick={this.goBack.bind(this)}/>
        </section>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    paymentReducer: state.paymentReducer
  }
}

export default connect(mapStateToProps, {undefined} )(Payment)
