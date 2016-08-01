import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, /*IndexRoute,*/ hashHistory } from 'react-router';

import LandingPage from './components/LandingPage/LandingPage';
import Webshop from './components/WebshopPage/Webshop';
import Gallery from './components/galleryPage/Gallery';

const app = document.getElementById('app')

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Gallery}>
      <Route path="webshop" component={Webshop}></Route>
      <Route path="gallery" component={Gallery}></Route>
    </Route>
  </Router>,
  app);
