require('babel-polyfill')
import React from 'react'
import firebase from 'firebase/app'
require('firebase/auth')

import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Match, Route, browserHistory, IndexRoute } from 'react-router'

import LandingPage from './compositions/landingPage/LandingPage'
import Webshop from './compositions/webshopPage/Webshop'
import Gallery from './compositions/galleryPage/Gallery'
import ServiceSelector from './components/services/ServiceSelector'
import Faq from './compositions/faq/Faq'
import FaqServices from './compositions/faq/FaqServices'
import Products from './components/webshop/products/Products'
import Product from './components/webshop/products/Product'
import WebshopHome from './compositions/webshopPage/WebshopHome'
import Admin from './compositions/adminPage/Admin'
import Login from './compositions/adminPage/Login'
import Payment from './compositions/checkoutPage/Payment'
import Confirmation from './compositions/checkoutPage/Confirmation'
import Checkout from './compositions/checkoutPage/Checkout'
import BadrumsrenoveringForm from './compositions/servicesPage/BadrumsrenoveringForm'
import VVSserviceForm from './compositions/servicesPage/VVSserviceForm'

import store from './store/store'

//Initialize firebase
var config = {
  apiKey: key,
  authDomain: 'badrumsboden-c7b46.firebaseapp.com',
  databaseURL: 'https://badrumsboden-c7b46.firebaseio.com',
  storageBucket: 'badrumsboden-c7b46.appspot.com'
}
firebase.initializeApp(config)

const app = document.getElementById('app')
const NotFound = () => (<h4 style={{textAlign: 'center', paddingTop: 100}}>404.. Oops, nu hamnade du fel!</h4>)

function requireAuth(nextState, replace, callback) {
  firebase.auth().onAuthStateChanged((user) => {
    if (null === user) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
      callback()
    }
    callback()
  })
}

const router = (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={LandingPage}></Route>

        <Route path="webshop" component={Webshop}>
          <IndexRoute component={WebshopHome}></IndexRoute>
            <Route path="/webshop/faq" component={Faq}></Route>
            <Route path="/webshop/checkout" component={Checkout}></Route>
            <Route path="/webshop/payment" component={Payment}></Route>
            <Route path="/webshop/confirmation" component={Confirmation}></Route>
            <Route path="/webshop/:category" component={Products}></Route>
            <Route path="/webshop/:category/:subcategory" component={Products}></Route>
            <Route path="/webshop/:category/:subcategory/:supplier" component={Products}></Route>
            <Route path="/webshop/:category/:subcategory/:supplier/:series" component={Products}></Route>
            <Route path="/webshop/:category/:subcategory/:supplier/:series/:product" component={Product}></Route>
        </Route>

        <Route path="gallery" component={Gallery}></Route>
        <Route path="services" component={ServiceSelector}></Route>
          <Route path="services/badrumsrenovering" component={BadrumsrenoveringForm}></Route>
          <Route path="services/VVSservice" component={VVSserviceForm}></Route>
          <Route path="services/faq" component={FaqServices}></Route>

        <Route path="login" component={Login}></Route>
        <Route path="admin" component={Admin} onEnter={requireAuth}>
          <Route path="/admin/:site" component={Admin}></Route>
          <Route path="/admin/:site/:section" component={Admin}></Route>
          <Route path="/admin/:site/:section/:category/:subcategory" component={Admin}></Route>
        </Route>

        <Route path="*" component={NotFound}></Route>
      </Router>
    </Provider>
)

render(router, app)
