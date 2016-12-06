import React, { Component } from 'react'
import Header from '../../components/faq/Header'
import Footer from '../../components/webshop/Footer'
import axios from 'axios'
require('styles/_webshopPage/faq.css')

export default class Faq extends Component {

  render() {
    return (
      <div>
        <Header/>
        <div id="infoBank">
          <div>
            <h2>Vanliga frågor</h2>
            <div className="info">
              <h4>Har ni en fysisk butik?</h4>
              <p>
                I vår butik på Västerslätt, Kabelvägen 8 (E4 västra länken),
                hittar du en utställning med badrumsmöbler, kakel och klinker,
                våtrumsmatta och våtrumsskivor.
                Här kan du se och känna på produkter för att få inspiration.<br/>
                <br />
                <span>Öppettider:</span><br/>
                Vardagar: 11.00 - 17.00<br/>
                Lördagar: 11.00 - 14.00<br/><br/>
                Under 1/12 - 31/3 är butiken stängd lördagar
              </p>

              <h4>Kan jag returnera en vara?</h4>
              <p>
                Ja det tar oftast 5 arbetsdagar
              </p>
            </div>
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
