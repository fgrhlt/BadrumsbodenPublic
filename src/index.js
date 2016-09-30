import React from 'react'

import firebase from 'firebase/app'

import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import LandingPage from './compositions/landingPage/LandingPage'
import Webshop from './compositions/webshopPage/Webshop'
import Gallery from './compositions/galleryPage/Gallery'
import Services from './compositions/servicesPage/Services'
import Animation from './components/Animation'
import Admin from './compositions/adminPage/Admin'
import Checkouts from './compositions/WebshopPage/Checkouts'
import Faq from './compositions/faq/Faq'
import Products from './components/webshop/Products'
import Product from './components/webshop/Product'
import WebshopHome from './compositions/webshopPage/WebshopHome'
import NewAdmin from './components/adminSimon/Admin'

require('styles/styles.css')

import store from './store/store'

//Initialize firebase
var config = {
  apiKey: 'AIzaSyBQnvDISWtShRbrtheOm2uvAP_iGie6sGM',
  authDomain: 'badrumsboden-c7b46.firebaseapp.com',
  databaseURL: 'https://badrumsboden-c7b46.firebaseio.com',
  storageBucket: 'badrumsboden-c7b46.appspot.com'
}
firebase.initializeApp(config)

const app = document.getElementById('app')
const NotFound = () => (
  <h4>404.. Oops, nu hamnade du fel!</h4>)

const router = (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={LandingPage}></Route>

        <Route path="webshop" component={Webshop}>
          <IndexRoute component={WebshopHome}></IndexRoute>
          <Route path="/webshop/:category" component={Products}></Route>
          <Route path="/webshop/:category/:subcategory" component={Products}></Route>
          <Route path="/webshop/:category/:subcategory/:product" component={Product}></Route>
        </Route>

        <Route path="gallery" component={Gallery}></Route>
        <Route path="services" component={Services}></Route>
        <Route path="admin" component={Admin}></Route>

        <Route path="newAdmin" component={NewAdmin}>
          <Route path="/newAdmin/:site" component={NewAdmin}></Route>
          <Route path="/newAdmin/:site/:section" component={NewAdmin}></Route>
          <Route path="/newAdmin/:site/:section/:category/:subcategory" component={NewAdmin}></Route>
        </Route>

        <Route path="checkout" component={Checkouts}></Route>
        <Route path="faq" component={Faq}></Route>
        <Route path="animation" component={Animation}></Route>
        <Route path="*" component={NotFound}></Route>
      </Router>
    </Provider>
)

render(router, app)
