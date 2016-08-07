import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router';

import App from './components/App';
import Webshop from './components/WebshopPage/Webshop';
import Gallery from './components/galleryPage/Gallery';
<<<<<<< 1f86b16c806ab08638046ac5aa9956c1aae0e0a0
import Services from './components/servicesPage/Services';

=======
import Admin from './components/adminPage/Admin';

import store, { history } from './store/store'
>>>>>>> Massa grejer gjort nu

const app = document.getElementById('app')
const NotFound = () => (
  <h4>404.. Oops, nu hamnade du fel!</h4>)

<<<<<<< 1f86b16c806ab08638046ac5aa9956c1aae0e0a0
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={LandingPage}></Route>
    <Route path="/webshop" component={Webshop}></Route>
    <Route path="/gallery" component={Gallery}></Route>
    <Route path="/Services" component={Services}></Route>
    <Route path="/*" component={NotFound}></Route>
  </Router>,
  app);
=======

const router = (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}></Route>
        <Route path="/webshop" component={Webshop}></Route>
        <Route path="/gallery" component={Gallery}></Route>
        <Route path="/admin" component={Admin}></Route>
        <Route path="/*" component={NotFound}></Route>
      </Router>
    </Provider>
)

render(router, app)

// ReactDOM.render(
//     <Router history={browserHistory}>
//       <Route path="/" component={LandingPage}></Route>
//       <Route path="/webshop" component={Webshop}></Route>
//       <Route path="/gallery" component={Gallery}></Route>
//       <Route path="/admin" component={Admin}></Route>
//       <Route path="/*" component={NotFound}></Route>
//     </Router>,
//   app);
>>>>>>> Massa grejer gjort nu
