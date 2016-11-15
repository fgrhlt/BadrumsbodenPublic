import React, { Component } from 'react'
require('../../styles/_servicesPage/serviceSelector.css')

export default class ServiceSelector extends Component {

  componentWillMount() {
    this.state = {
      left: {
        name: 'left standard',
        innerContent: '',
        arrow: 'hidden',
        description: 'hidden'
      },
      right: {
        name: 'right standard',
        innerContent: '',
        arrow: 'hidden',
        description: 'hidden'
      }
    }
  }

  /* Toggles the service field back and forth. Depending if you click left or right,
   * the service-divs will get different classnames.
   * Also tells the parent which div was clicked: left or right */
  toggleService(e) {
    let left = this.refs.left
    let right = this.refs.right

    /* If you clicked the left or right box and it's minimized, put both to normal state */
    if((e.currentTarget == left && e.currentTarget.className == 'left minimized')
    || (e.currentTarget == right && e.currentTarget.className == 'right minimized')) {
      this.setState({
        left: {name:'left standard', innerContent:'', description:'hidden', arrow:'hidden'},
        right: {name:'right standard', innerContent:'', description:'hidden', arrow:'hidden'}
      })
      this.props.hideCalculators()
    }

    /* If you clicked the left box, expand it and minimize the right */
    else if(e.currentTarget == left) {
      this.setState({
        left: {name: 'left expanded', description:'visible', innerContent:'expandedInnerContent'},
        right: {name: 'right minimized', innerContent:'hidden'}
      })
    }

    /* If you clicked the right box, expand it and minimize the left */
    else if(e.currentTarget == right) {
      this.setState({
        right: {name: 'right expanded', description:'visible', innerContent:'expandedInnerContent'},
        left: {name: 'left minimized', innerContent:'hidden'}
      })
    }
  }

  /* Tells the parent which service to display: left or right */
  handleClick(userChoice) {
    this.props.displayCalculators(userChoice)

    //var element = document.getElementById('features');
    //element.scrollIntoView();
  }

  render() {
    let containerStyle = {
      backgroundImage: 'url(assets/images/services/service_bg.jpg)',
    }

    return (
      <div className="serviceSelector" style={containerStyle}>

        <div ref="left" className={this.state.left.name} onClick={this.toggleService.bind(this)}>
          <figure className={this.state.left.arrow} />

          <div className={this.state.left.innerContent}>
              <div id="mainInfo">
                <figure name="wrench" />
                <h2>Badrumsrenovering</h2>
                <h4>
                  Låt våra badrumsproffs med lång erfarenhet
                  utföra din badrumsrenovering.<br/>
                </h4>
              </div>

              <div className={this.state.left.description} id="description">
                <p>
                  Låt våra badrumsproffs med lång erfarenhet utföra din badrumsrenovering.
                  Vi följer alla tillämpbara branschregler och håller oss löpande
                  uppdaterade om alla nya regler och rekommendationer som utkommer.
                  <br /><br />
                  Om du lämnar ditt badrum i våra händer kan du känna dig trygg.
                  Fyll i underlaget på sidana Offertförfrågan så återkopplar vi
                  inom kort med vad just din renovering kommer att kosta.
                  Vi gör naturligtvis inte bara kaklade badrum.
                  Du väljer kakel, matta eller våtrumsskivor.
                </p>
                <button
                  className="btn"
                  onClick={this.handleClick.bind(this, "left")}>
                  Beräkna din kostnad
                </button>
              </div>
          </div>
          <div className="border" />
        </div>

        <div ref="right" className={this.state.right.name} onClick={this.toggleService.bind(this)}>
          <figure className={this.state.right.arrow} />

          <div className={this.state.right.innerContent}>
            <div className={this.state.right.description} id="description">
              <p>
                Låt våra badrumsproffs med lång erfarenhet utföra din badrumsrenovering.
                Vi följer alla tillämpbara branschregler och håller oss löpande
                uppdaterade om alla nya regler och rekommendationer som utkommer.
                <br /><br />
                Om du lämnar ditt badrum i våra händer kan du känna dig trygg.
                Fyll i underlaget på sidana Offertförfrågan så återkopplar vi
                inom kort med vad just din renovering kommer att kosta.
                Vi gör naturligtvis inte bara kaklade badrum.
                Du väljer kakel, matta eller våtrumsskivor.
              </p>
              <button
                className="btn"
                onClick={this.handleClick.bind(this, "right")}>
                Kontakt för VVS-service
              </button>
            </div>
            <div id="mainInfo">
              <figure name="tap"/>
              <h2>VVS</h2>
              <h4>
                Kontakta oss för att utföra VVS-service.<br/>
                Vi utför snabb service inom 5 arbetsdagar.
              </h4>
            </div>
          </div>
          <div className="border" />
        </div>
      </div>
    )
  }
}
