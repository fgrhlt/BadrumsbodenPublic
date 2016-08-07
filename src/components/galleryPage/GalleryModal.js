import React, { Component } from 'react'
import Modal from 'react-modal'

export default class GalleryModal extends Component {

  componentWillMount() {
    this.state = {
      open: false
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal () {
    this.setState({open: true})
  }

  closeModal () {
    this.setState({open: false})
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal}>Open Modal</button>

        <Modal
          isOpen={this.state.open}
          onRequestClose={this.closeModal}
          shouldCloseOnOverlayClick={true}
          className="ModalClass"
          overlayClassName="OverlayClass">

          <h1>Basic Modal</h1>
          <button onClick={this.closeModal}>Close</button>
          <img src="http://placekitten.com/404/303"/>

        </Modal>
      </div>
    )
  }
}
