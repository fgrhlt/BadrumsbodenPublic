import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import firebase from 'firebase/app'
require('firebase/auth')
require('../../styles/_adminSimon/login.css')


export default class Login extends Component {

  componentWillMount() {
    this.state = {
      message: '',
      signedIn: false
    }

    firebase.auth().onAuthStateChanged( (user) => {
      if (user) {
        // User is signed in.
        this.setState({
          message: 'Användare '+user.email+' är inloggad',
          signedIn: true
        })

        const location = this.props.location
        if (location.state && location.state.nextPathname) {
          browserHistory.push(location.state.nextPathname)
        } else {
          browserHistory.push('/admin')
        }
      } else {
        // No user is signed in.
        this.setState({
          message: 'Ingen användare är inloggad'
        })
      }
    })
  }


  handleSubmit(log) {

    const email = this.refs.email.value
    const pass = this.refs.pass.value

    if (log=='login') {
      const promise = firebase.auth().signInWithEmailAndPassword(email, pass)

      promise.catch((e) => {
        this.setState({
          message: e.message
        })
      })
    } else if (log=='logout') {
      const promise = firebase.auth().signOut()
      promise.catch( (e) => {console.log(e.message)})
    }
  }

  render() {
    return (
      <div id="loginAdmin">
        <figure className="logo"/>

        <section>
          <h2>Logga in</h2>
          <input type="text" ref="email" placeholder="Email" />
          <input type ="password" ref="pass" placeholder="Skriv in lösenord" /><br/>

          {!this.state.signedIn ? <button className="btn greenButton" onClick={this.handleSubmit.bind(this, 'login')}>Logga in</button> : ''}
          {this.state.signedIn ? <button className="btn orangeButton" onClick={this.handleSubmit.bind(this, 'logout')}>Logga ut</button> : ''}

          <p>{this.state.message}</p>
        </section>
      </div>
    )
  }
}
