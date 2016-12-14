import React, { Component } from 'react'
import AdminGallery from '../../components/admin/Services/AdminGallery'

require('styles/_admin/_services/adminServices.css')

export default class AdminServices extends Component {
  render() {
    return (
      <div id="adminServices">
        <AdminGallery />
      </div>
    )
  }
}
