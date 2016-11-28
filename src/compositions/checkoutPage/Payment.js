import React, { Component } from 'react'
import axios from 'axios'
require('styles/_webshopPage/infoBank.css')

export default class Payment extends Component {

  componentWillMount() {

    axios.get('/payment')
    .then(function (response) {
console.log('response', response);
      document.getElementById("mydiv").innerHTML += response.data
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  render() {
    return (
      <div id="mydiv"/>
    )
  }
}
