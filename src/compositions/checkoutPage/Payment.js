import React, { Component } from 'react'
import axios from 'axios'
require('styles/_webshopPage/infoBank.css')

export default class Payment extends Component {

  componentWillMount() {
    this.state = {
      url: ''
    }
  }

  componentDidMount() {
    let data = this.props.data

    axios.post('/payment', { data })
    .then(function (response) {
      //Extracting the URL
      let url = response.data
      let splittedUrl = url.split(' ')
      let formattedURL = splittedUrl[3].slice(5, -15)

      this.setState({ url: formattedURL })
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    })
  }

  render() {
    return (
      <div>
        <section>
          <h2>Betalning</h2>
          <iframe
            frameBorder="0"
            id="paysonIframe"
            style={{'height':'600px', 'width': '800px'}}
            src={this.state.url}>
          </iframe>
        </section>
      </div>
    )
  }
}
