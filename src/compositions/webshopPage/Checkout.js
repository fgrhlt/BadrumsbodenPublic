import React, { Component } from 'react'
import axios from 'axios'

require('styles/_webshopPage/webshop.css')

export default class Checkout extends Component {

  postRequest() {

    // // Send a POST request
		// axios({
		//   method: 'post',
		//   url: 'https://shrouded-plateau-50284.herokuapp.com/payment',
		//   data: {"firstName":"Alfred", "lastName": "Chang", "email": "support@mlab.com"}
		// })

    // // Send a POST request
		// axios({
		//   method: 'post',
		//   url: 'https://shrouded-plateau-50284.herokuapp.com/email',
		//   data: {"firstName":"Alfred", "lastName": "Chang", "email": "support@mlab.com"}
		// })

		// // Send a POST request
		// axios({
		//   method: 'post',
		//   url: 'https://shrouded-plateau-50284.herokuapp.com/contacts',
		//   data: {"firstName":"Alfred", "lastName": "Chang", "email": "support@mlab.com"}
		// })
	}

  render() {
    return (
			<div >
				<button onClick={this.postRequest.bind(this)} type="button" name="button">Send req</button>
			</div>
    )
  }
}
