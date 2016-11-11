import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../actions/firebaseActions'

export default class GalleryElement extends Component {

  componentWillMount() {
    this.state = {
      description: '',
      price: '',
      title: '',
      articleNr: ''
    }
  }

  handleUploadBtnClick() { 
    const { item, updateDescription } = this.props
    const { description, price, title, articleNr } = this.state

    updateDescription(item.folder, item.key, item.name, description, price, title, articleNr)

    this.setState({
      description: '',
      price: '',
      title: '',
      articleNr: ''
    })
  }

  handleDeleteBtnClick() { 
    const { item, deleteFirebaseElement } = this.props
    deleteFirebaseElement(item.folder, item.key, item.name)
  }

  handleChangeDescription(event) {
    this.setState({
      description: event.target.value
    })
  }

  handleChangePrice(event) {
    this.setState({
      price: event.target.value
    })
  }

  handleChangeTitle(event) {
    this.setState({
      title: event.target.value
    })
  }

  handleChangeArticleNr(event) {
    this.setState({
      articleNr: event.target.value
    })
  }

  render() {
    var divStyle = { height: 200 }
    const { item } = this.props

    return (
      <div style={{ paddingBottom: 20, paddingTop: 20}}>
          <li>{'Name: '+item.name}</li>
          <li>{'Folder: '+item.folder}</li>
          <br/>
          <img style={divStyle} src={item.url} alt="" />
          <br/>
          <button onClick={this.handleDeleteBtnClick.bind(this)} type="button">Delete</button>
          <br/>

          <h4>Description</h4>
          <input
            style={{backgroundColor:'lightgrey'}}
            type="text"
            value={this.state.value}
            onChange={this.handleChangeDescription.bind(this)}>
          </input>
          <br/>

          <h4>Price</h4>
          <input
            style={{backgroundColor:'lightgrey'}}
            type="text"
            value={this.state.value}
            onChange={this.handleChangePrice.bind(this)}>
          </input>
          <br/>

          <h4>Title</h4>
          <input
            style={{backgroundColor:'lightgrey'}}
            type="text"
            value={this.state.value}
            onChange={this.handleChangeTitle.bind(this)}>
          </input>
          <br/>

          <h4>ArticleNr</h4>
          <input
            style={{backgroundColor:'lightgrey'}}
            type="text"
            value={this.state.value}
            onChange={this.handleChangeArticleNr.bind(this)}>
          </input>
          <br/>
          <button type="button" onClick={this.handleUploadBtnClick.bind(this)}>Upload</button>
        </div>
      )
    }
  }

  function mapStateToProps(state) {
    return {
      firebaseData: state.firebaseReducer.firebaseData
    }
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators(firebaseActions, dispatch)
  }

  export default connect(mapStateToProps, mapDispatchToProps)(GalleryElement)
