import React, { Component } from 'react'
import AdminHeader from '../../components/admin/AdminHeader'
import AdminWebshopMenu from '../../components/admin/AdminWebshopMenu'
import Products from './Products'
import Campaigns from './Campaigns'
import Banner from '../../components/admin/Campaigns/Banner'
import AdminServices from './AdminServices'

export default class Admin extends Component {
  render() {
    let site = this.props.params.site
    let section = this.props.params.section

    /* Render different components depending on the URL */
    return (
      <div>
        <AdminHeader param={site} />
        {site=='webshop' ? <AdminWebshopMenu param={section} /> : ''}
        {site=='webshop' && section=='produkter' ? <Products param={this.props.params}/> : ''}
        {site=='webshop' && section=='kampanjer' ? <Campaigns /> : ''}
        {site=='webshop' && section=='kampanjer' ? <Banner /> : ''}
        {site=='tjanster' ? <AdminServices /> : ''}
      </div>
    )
  }
}
