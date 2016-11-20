import React, { Component } from 'react'
import Header from '../../components/faq/Header'
import Footer from '../../components/webshop/Footer'
import axios from 'axios'
require('../../styles/_webshopPage/infoBank.css')

export default class Faq extends Component {

  onClick() {

    var instance = axios.create({
      baseURL: ' https://api.payson.se/1.0/',
      timeout: 1000,
      headers: {
        'PAYSON-SECURITY-USERID': 1521,
        'PAYSON-SECURITY-PASSWORD': '03bdcce4-5b50-4ecf-b53f-ff6891a0af34',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    instance.post('Pay/', {
        returnUrl: 'blocket.se',
        cancelUrl: 'blocket.se',
        memo: 'hej!',
        senderEmail: '00badrumsboden@gmail.com',
        senderFirstName: 'Alfred',
        senderLastName: 'Ödling',
        Description: 'Order item 1. Blue jeans',
        UnitPrice: '899',
        Quantity: '1',
        TaxPercentage: '0,25',
        Sku: 'N123456',
      })
      .then(function (response) {
        // https://www.payson.se/paySecure/?token={response.TOKEN}
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    return (
      <div>
        <Header/>
        <div id="infoBank">
          <div>
            <h2>Vanliga frågor</h2>
              <button type="button" name="button" onClick={this.onClick}>hej</button>

            <p>
              Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin.
              Lorem ipsum har varit standard ända sedan 1500-talet, när en okänd
              boksättare tog att antal bokstäver och blandade dem för att göra ett
              provexemplar av en bok. Lorem ipsum har inte bara överlevt fem
              århundraden, utan även övergången till elektronisk typografi utan större
              förändringar. Det blev allmänt känt på 1960-talet i samband med
              lanseringen av Letraset-ark med avsnitt av Lorem Ipsum, och senare
              med mjukvaror som Aldus PageMaker.
            </p>
          </div>

          <div>
            <h2>Betalning</h2>
            <p>
              Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin.
              Lorem ipsum har varit standard ända sedan 1500-talet, när en okänd
              boksättare tog att antal bokstäver och blandade dem för att göra ett
              provexemplar av en bok. Lorem ipsum har inte bara överlevt fem
              århundraden, utan även övergången till elektronisk typografi utan större
              förändringar. Det blev allmänt känt på 1960-talet i samband med
              lanseringen av Letraset-ark med avsnitt av Lorem Ipsum, och senare
              med mjukvaror som Aldus PageMaker.
            </p>
          </div>

          <div>
            <h2>Frakt och leverans</h2>
            <p>
              Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin.
              Lorem ipsum har varit standard ända sedan 1500-talet, när en okänd
              boksättare tog att antal bokstäver och blandade dem för att göra ett
              provexemplar av en bok. Lorem ipsum har inte bara överlevt fem
              århundraden, utan även övergången till elektronisk typografi utan större
              förändringar. Det blev allmänt känt på 1960-talet i samband med
              lanseringen av Letraset-ark med avsnitt av Lorem Ipsum, och senare
              med mjukvaror som Aldus PageMaker.
            </p>
          </div>

          <div>
            <h2>Retur och ångerrätt</h2>
            <p>
              Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin.
              Lorem ipsum har varit standard ända sedan 1500-talet, när en okänd
              boksättare tog att antal bokstäver och blandade dem för att göra ett
              provexemplar av en bok. Lorem ipsum har inte bara överlevt fem
              århundraden, utan även övergången till elektronisk typografi utan större
              förändringar. Det blev allmänt känt på 1960-talet i samband med
              lanseringen av Letraset-ark med avsnitt av Lorem Ipsum, och senare
              med mjukvaror som Aldus PageMaker.
            </p>
          </div>

          <div>
            <h2>Garanti och reklamation</h2>
            <p>
              Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin.
              Lorem ipsum har varit standard ända sedan 1500-talet, när en okänd
              boksättare tog att antal bokstäver och blandade dem för att göra ett
              provexemplar av en bok. Lorem ipsum har inte bara överlevt fem
              århundraden, utan även övergången till elektronisk typografi utan större
              förändringar. Det blev allmänt känt på 1960-talet i samband med
              lanseringen av Letraset-ark med avsnitt av Lorem Ipsum, och senare
              med mjukvaror som Aldus PageMaker.
            </p>
          </div>

        </div>
        <Footer/>
      </div>
    )
  }
}
