import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import firebase from 'firebase/app'
require('firebase/auth')

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
          message: 'User '+user.email+' is signed in',
          signedIn: true
        })

        const location = this.props.location
        if (location.state && location.state.nextPathname) {
          browserHistory.push(location.state.nextPathname)
        } else {
          browserHistory.push('/newAdmin')
        }
      } else {
        // No user is signed in.
        this.setState({
          message: 'No user is signed in'
        })
      }
    })
  }


  handleSubmit(log, event) {

    const email = this.refs.email.value
    const pass = this.refs.pass.value

    if (log=='login') {
      const promise = firebase.auth().signInWithEmailAndPassword(email, pass)

      promise.catch( (e) => {
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
      <div>
        <input ref="email" placeholder="email" defaultValue="00badrumsboden@gmail.com" /> <br/>
        <input ref="pass" placeholder="Skriv in lösenord" /><br/>

        {!this.state.signedIn ? <button onClick={this.handleSubmit.bind(this, 'login')}>login</button> : ''}
        {this.state.signedIn ? <button onClick={this.handleSubmit.bind(this, 'logout')}>logout</button> : ''}

        {this.state.message}
      </div>
    )
  }
}
