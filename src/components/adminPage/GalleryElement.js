import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions/actionCreators'

export default class GalleryElement extends Component {

// componentWillMount() {
//   this.state = {
//     clickedDelete: false
//   }
// }
//
// handleClick() {
//   this.setState({
//     clickedDelete: true
//   })
// }

  render() {

    return (
      <div>
        <li>{this.props.item.name}</li>
        <br/>
        <img src={this.props.item.url} alt="" />
        <br/>
        <button type="button">Delete</button>
      </div>
    )
  }
}
