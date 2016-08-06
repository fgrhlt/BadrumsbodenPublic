import React, { Component } from 'react'

require('styles/_servicesPage/galleryPreview.css')

export default class PriceCalc extends Component {
  render() {

    return (
      <div id="galleryPreview">
        <div id="lostGrid">

          <h2>Låt dig inspireras av bilder från våra projekt</h2>
          <section>
            <div>
              <div><figure style={{backgroundImage: 'url(http://placekitten.com/1045/305)'}} /></div>
            </div>

            <div>
              <div><figure style={{backgroundImage: 'url(http://placekitten.com/1045/305)'}} /></div>
              <div><figure style={{backgroundImage: 'url(http://placekitten.com/505/305)'}} /></div>
              <div><figure style={{backgroundImage: 'url(http://placekitten.com/805/605)'}} /></div>
            </div>
          </section>

          <section>
            <figure style={{backgroundImage: 'url(http://placekitten.com/800/800)'}} />
          </section>

          <section>
            <div>
              <div><figure style={{backgroundImage: 'url(http://placekitten.com/405/605)'}} /></div>
              <div><figure style={{backgroundImage: 'url(http://placekitten.com/855/305)'}} /></div>
            </div>

            <div>
              <div><figure style={{backgroundImage: 'url(http://placekitten.com/605/505)'}} /></div>
            </div>
          </section>
        </div>

        <a href="">Till galleriet <figure /></a>
      </div>
    )
  }
}
