import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, /*IndexRoute,*/ hashHistory } from 'react-router';

import LandingPage from './components/LandingPage/LandingPage';
import Webshop from './components/WebshopPage/Webshop';
import Gallery from './components/galleryPage/Gallery';

const app = document.getElementById('app')
const NotFound = () => (
  <h1>404.. This page is not found!</h1>)

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={LandingPage}>
      <Route path="webshop" component={Webshop}></Route>
      <Route path="gallery" component={Gallery}></Route>
      <Route path='*' component={NotFound}></Route>
    </Route>
  </Router>,
  app);
