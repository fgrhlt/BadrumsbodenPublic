import React, { Component } from 'react'
import Header from './Header.js'

require('styles/_galleryPage/gallery.css')

export default class Gallery extends Component {
  render() {
    return (
      <div>
        <Header></Header>

        <div id="info">

          <div>
            <h2>Galleri</h2>
            <p>
              Här kommer ett urval av senaste badrumsrenoveringar och installationer.
              Vi hoppas att Ni finner inspiration av dessa produkter och köper allt vi har att erbjuda.
              Bilderna är tagna från google och är inget vi har gjort själv,
              men vi gör förhoppningsvis någonting som är likvärdigt!
            </p>
          </div>

        </div>
      </div>
    )
  }
}

Gallery.defaultProps = {}
