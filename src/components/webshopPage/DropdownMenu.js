import React, { Component, PropTypes } from 'react'

export default class DropdownMenu extends Component {

  listItem() {
    return
  }

  render() {
    return (
      <ul>
        <li className="dropdown">
            <a href="#" className="dropbtn">Dropdown</a>
            <div className="dropdown-content">
             <div>
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
             </div>
             <div>
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
             </div>
            </div>
        </li>

      </ul>
    )
  }
}
