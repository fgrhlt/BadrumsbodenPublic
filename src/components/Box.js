import React, { Component } from 'react'
//Downloaded gsap npm (including TweenMax)
import TweenMax from 'gsap'

export default class Box extends Component {
  componentWillEnter (callback) {
    const el = React.findDOMNode(this);
    TweenMax.fromTo(el, 0.3, {y: 100, opacity: 0}, {y: 0, opacity: 1, onComplete: callback});
  }

  componentWillLeave (callback) {
    const el = React.findDOMNode(this);
    TweenMax.fromTo(el, 0.3, {y: 0, opacity: 1}, {y: -100, opacity: 0, onComplete: callback});
  }

  render () {
    return <div className="box"/>;
  }
}
