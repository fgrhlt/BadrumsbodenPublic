import React, { Component } from 'react'
import LightboxGallery from './LightboxGallery'
import Lightbox from 'react-images';
import Header from './Header.js'

require('styles/_galleryPage/gallery.css')

export default class Gallery extends Component {

  componentWillMount() {
    this.setState ({
      lightboxIsOpen:true
    })
  }

  render() {
    return (
      <div>
        <Header></Header>

        <div id="info">
          <div>
            <h2>Galleri</h2>
            <p>
              Här kommer ett urval av senaste badrumsrenoveringar och installationer.
              Vi hoppas att ni finner inspiration av dessa produkter och köper allt vi har att erbjuda.
              Bilderna är tagna från google och är inget vi har gjort själv,
              men vi gör förhoppningsvis någonting som är likvärdigt!
            </p>
          </div>
        </div>

        <LightboxGallery
          images={[{ src: 'http://placekitten.com/404/303' },
                   { src: 'http://placekitten.com/444/343' }]}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          onClose={this.closeLightbox}
        />

        <div className="container">
          <h3>Badrum</h3>

          <section>
            <div>
              <figure><img src="http://placekitten.com/404/303" />
                <div>Det här här information om katten som ni ser här hallåå lalalal</div>
              </figure>
            </div>

            <div>
              <figure><img src="http://placekitten.com/404/353" /></figure>
              <figure><img src="http://placekitten.com/404/210" /></figure>
              <figure><img src="http://placekitten.com/201/303" /></figure>
            </div>

            <div>
              <figure><img src="http://placekitten.com/100/303" /></figure>
              <figure><img src="http://placekitten.com/200/303" /></figure>
              <figure><img src="http://placekitten.com/540/303" /></figure>
            </div>
          </section>
        </div>

        <div className="container">
          <h3>Kök</h3>

          <section>
            <div>
              <figure><img src="http://placekitten.com/404/303" /></figure>
              <figure><img src="http://placekitten.com/405/213" /></figure>
              <figure><img src="http://placekitten.com/404/210" /></figure>
            </div>

            <div>
              <figure><img src="http://placekitten.com/404/353" /></figure>
              <figure><img src="http://placekitten.com/404/210" /></figure>
              <figure><img src="http://placekitten.com/201/303" /></figure>
            </div>

            <div>
              <figure><img src="http://placekitten.com/100/303" /></figure>
              <figure><img src="http://placekitten.com/200/303" /></figure>
              <figure><img src="http://placekitten.com/540/303" /></figure>
            </div>
          </section>
        </div>

      </div>
    )
  }
}
