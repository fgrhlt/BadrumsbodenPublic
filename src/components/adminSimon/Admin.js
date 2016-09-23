import React, { Component } from 'react'

import AdminHeader from './AdminHeader'
import AdminWebshopMenu from './AdminWebshopMenu'
import Products from './Products/Products'
import Campaigns from './Campaigns/Campaigns'

export default class Admin extends Component {
  render() {
    let site = this.props.params.site
    let section = this.props.params.section

    /* Render different components depending on the URL */
    return (
      <div>
        <AdminHeader param={site} />
        {site=='webshop' ? <AdminWebshopMenu param={section} /> : ''}
        {site=='webshop' && section=='produkter' ? <Products /> : ''}
        {site=='webshop' && section=='kampanjer' ? <Campaigns /> : ''}

        

      </div>
    )
  }
}
