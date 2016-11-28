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
      <div id='paysonContainer' url='https://test-www.payson.se/embedded/checkout?id=e36b2f9d-4b72-4e96-9b05-a6cc0139f505'></div>    )
  }
}
