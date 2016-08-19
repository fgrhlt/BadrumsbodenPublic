import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router';

import LandingPage from './components/landingPage/LandingPage';
import Webshop from './components/WebshopPage/Webshop';
import Gallery from './components/galleryPage/Gallery';
import Services from './components/servicesPage/Services';
import Admin from './components/adminPage/Admin';

import store from './store/store'

const app = document.getElementById('app')
const NotFound = () => (
  <h4>404.. Oops, nu hamnade du fel!</h4>)

const router = (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={LandingPage}></Route>
        <Route path="/webshop" component={Webshop}></Route>
        <Route path="/gallery" component={Gallery}></Route>
        <Route path="/services" component={Services}></Route>
        <Route path="/admin" component={Admin}></Route>
        <Route path="/*" component={NotFound}></Route>
      </Router>
    </Provider>
)

render(router, app)
