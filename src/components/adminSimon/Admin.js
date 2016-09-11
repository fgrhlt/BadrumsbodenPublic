import React, { Component } from 'react'

import AdminHeader from './AdminHeader'
import AdminWebshopMenu from './AdminWebshopMenu'
import Products from './Products/Products'
import Categories from './Categories/Categories'


export default class Admin extends Component {

  render() {
    return (
      <div>
        <AdminHeader />
        <AdminWebshopMenu />
        <Products />
        {/*}<Categories />{*/}

      </div>
    )
  }
}
