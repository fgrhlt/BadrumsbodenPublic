import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import axios from 'axios'
require('../../styles/_servicesPage/galleryPreview.css')

export default class GalleryPreview extends Component {
  componentWillMount() {
    this.state = {
      itemsbadrum: [],
      itemskok: []
    }

    this.fetchData('badrum')
    this.fetchData('kok')
  }

  fetchData(type) {
    let path = 'items'+type

    axios.get('/gallery/'+type)
    .then(function (response) {
      console.log('res', response);
      console.log(' response.data',  response.data);

      let urls = response.data.map( (item) => {
        return item.url
      })

      this.setState({
        [path]: urls
      })
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    })
  }

  onClickGallery() {
    browserHistory.push('/gallery')
  }

  render() {
    const { itemsbadrum, itemskok } = this.state

    return (
      <div id="galleryPreview">
        <div id="lostGrid" onClick={this.onClickGallery.bind(this)}>

          <h2>Låt dig inspireras av bilder från våra projekt</h2>
          <section>
            <div>
              <div><figure style={{backgroundImage: 'url('+ itemskok[0]+')' }} /></div>
            </div>

            <div>
              <div><figure style={{backgroundImage: 'url('+ itemskok[1]+')'}} /></div>
              <div><figure style={{backgroundImage: 'url('+ itemskok[2]+')'}} /></div>
              <div><figure style={{backgroundImage: 'url('+ itemskok[3]+')'}} /></div>
            </div>
          </section>

          <section>
            <figure style={{backgroundImage: 'url('+ itemsbadrum[0]+')'}} />
          </section>

          <section>
            <div>
              <div><figure style={{backgroundImage: 'url('+ itemsbadrum[1]+')'}} /></div>
              <div><figure style={{backgroundImage: 'url('+ itemsbadrum[2]+')'}} /></div>
            </div>

            <div>
              <div><figure style={{backgroundImage: 'url('+ itemsbadrum[3]+')'}} /></div>
            </div>
          </section>
        </div>

        <a onClick={this.onClickGallery.bind(this)}>Till galleriet <figure /></a>
      </div>
    )
  }
}
