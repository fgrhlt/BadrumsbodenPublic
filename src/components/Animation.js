import React, { Component } from 'react'
import TransitionGroup from 'react-addons-transition-group';
import Box from './Box'

export default class Animation extends Component {
  state = {
    shouldShowBox: true
  };

  toggleBox = () => {
    this.setState({
      shouldShowBox: !this.state.shouldShowBox
    });
  };

  render () {
      return <div className="page">

        <TransitionGroup>
          { this.state.shouldShowBox && <Box />}
        </TransitionGroup>

        <button
          className="toggle-btn"
          onClick={this.toggleBox}
        >
          toggle
        </button>
      </div>;
    }
  }
