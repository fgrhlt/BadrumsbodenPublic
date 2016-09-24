import React, { Component } from 'react'
require('styles/_servicesPage/serviceSelector2.css')

export default class ServiceSelector extends Component {

  componentWillMount() {
    this.state = {
      left: {
        name: '',
        innerContent: '',
        arrow: 'hidden'
      },
      right: {
        name: '',
        innerContent: '',
        arrow: 'hidden'
      }
    }
  }

  handleClick(e) {
    let left = this.refs.left
    let right = this.refs.right

    /* If you clicked the left or right box and it's minimized, put it to normal state */
    if((e.currentTarget == left && e.currentTarget.className == 'left minimized')
    || (e.currentTarget == right && e.currentTarget.className == 'right minimized')) {
      console.log('TJEEENA')
      this.setState({
        left: {
          name: '',
          innerContent: '',
          arrow: 'hidden'
        },
        right: {
          name: '',
          innerContent: '',
          arrow: 'hidden'
        }
      })
    }
    /* If you clicked the left box, expand it and minimize the right */
    else if(e.currentTarget == left) {
      this.setState({
        left: {
          name: 'left expanded',
          innerContent: '',
          arrow: 'hidden'
        },
        right: {
          name: 'right minimized',
          innerContent: 'hidden',
          arrow: ''
        }
      })
    }
    /* If you clicked the right box, expand it and minimize the left */
    else if(e.currentTarget == right) {
      this.setState({
        right: {
          name: 'right expanded',
          innerContent: '',
          arrow: 'hidden'
        },
        left: {
          name: 'left minimized',
          innerContent: 'hidden',
          arrow: ''
        }
      })
    }
  }

  render() {
    let containerStyle = {
      backgroundImage: 'url(assets/images/services/service_bg.jpg)',
    }

    return (
      <div className="serviceSelector" style={containerStyle}>

        <div ref="left" className={this.state.left.name} onClick={this.handleClick.bind(this)}>
          <figure className={this.state.left.arrow} />

          <div className={this.state.left.innerContent}>
            <figure name="wrench" />
            <h2>Badrumsrenovering</h2>
            <h3>
              Låt våra badrumsproffs med lång erfarenhet
              utföra din badrumsrenovering. Klicka och läs mer!
            </h3>
          </div>
          <div className="border" />
        </div>

        <div ref="right" className={this.state.right.name} onClick={this.handleClick.bind(this)}>
          <figure className={this.state.right.arrow} />

          <div className={this.state.right.innerContent}>
            <figure name="tap"/>
            <h2>VVS</h2>
            <h3>
              Låt våra badrumsproffs med lång erfarenhet
              utföra din badrumsrenovering. Klicka och läs mer!
            </h3>
          </div>
          <div className="border" />
        </div>

      </div>
    )
  }
}
