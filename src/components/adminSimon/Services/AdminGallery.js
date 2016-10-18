import React, { Component } from 'react'
import ComponentTitle from '../ComponentTitle'

require('styles/_adminSimon/_services/adminGallery.css')

export default class AdminGallery extends Component {
  componentWillMount() {
    this.state = {
      imagesBadrum: [
        'http://www.placekitten.com/220/200',
        'http://www.placekitten.com/220/200',
        'http://www.placekitten.com/220/200',
        'http://www.placekitten.com/260/200',
        'http://www.placekitten.com/270/200',
        'http://www.placekitten.com/280/200',
        'http://www.placekitten.com/290/250',
        'http://www.placekitten.com/210/240',
        'http://www.placekitten.com/220/230',
        'http://www.placekitten.com/230/240',
        'http://www.placekitten.com/240/250',
        'http://www.placekitten.com/250/250',
        'http://www.placekitten.com/240/200',
        'http://www.placekitten.com/250/200',
        'http://www.placekitten.com/260/200',
        'http://www.placekitten.com/270/200',
        'http://www.placekitten.com/280/200',
      ],
      imagesKok: [
        'http://www.placekitten.com/200/200',
        'http://www.placekitten.com/240/200',
        'http://www.placekitten.com/250/200',
        'http://www.placekitten.com/260/200',
        'http://www.placekitten.com/270/200',
        'http://www.placekitten.com/280/200',
        'http://www.placekitten.com/290/250',
        'http://www.placekitten.com/210/240',
        'http://www.placekitten.com/220/230',
        'http://www.placekitten.com/230/240',
        'http://www.placekitten.com/240/250',
        'http://www.placekitten.com/250/250',
      ],
    }
  }
  render() {
    return (
      <div id="adminGallery">
        <ComponentTitle
          title={"Bildgalleri"}
          text={"Här kan man ta bort, ändra, och lägga till bilder i galleriet."}
        />

        <div id="container">
          <section>
            <h3>Badrum</h3>
            <div className="lostContainer">
              {this.state.imagesBadrum.map((image, i) => (
                <div key={i}>
                  <figure style={{backgroundImage: 'url('+image+')'}} />
                  <button className="btn redButton delete">Ta bort</button>
                </div>
              ))}
            </div>
            <button className="btn greenButton">Lägg till bild</button>
          </section>

          <section>
            <h3>Kök</h3>
            <div className="lostContainer">
              {this.state.imagesKok.map((image, i) => (
                <div key={i}>
                  <figure style={{backgroundImage: 'url('+image+')'}} />
                  <button className="btn redButton delete">Ta bort</button>
                </div>
              ))}
            </div>
            <button className="btn greenButton">Lägg till bild</button>
          </section>
        </div>
      </div>
    )
  }
}
