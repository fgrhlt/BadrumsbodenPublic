import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import LandingPage from './components/LandingPage/LandingPage';
import Webshop from './components/WebshopPage/Webshop';
import Gallery from './components/galleryPage/Gallery';
import Services from './components/servicesPage/Services';


const app = document.getElementById('app')
const NotFound = () => (
  <h4>404.. Oops, nu hamnade du fel!</h4>)

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={LandingPage}></Route>
    <Route path="/webshop" component={Webshop}></Route>
    <Route path="/gallery" component={Gallery}></Route>
    <Route path="/Services" component={Services}></Route>
    <Route path="/*" component={NotFound}></Route>
  </Router>,
  app);
