import React, { Component } from 'react'

require('styles/_adminSimon/_campaigns/campaignChooser.css')

/* Each thumbnail which contains an image and can be clicked on */
class Thumbnail extends Component {
  componentWillMount() {
    this.state = {clicked: false}
  }
  handleClick() {
    this.setState({clicked:!this.state.clicked})
  }
  render() {
    let style = {
      backgroundImage: 'url('+this.props.url+')'
    }
    return (
      <div>
        <figure style={style} onClick={this.handleClick.bind(this)} />
        {console.log(this.props.url)}
      </div>
    );
  }
}

/* The chooser which contains thumbnails to be selected */
export default class CampaignChooser extends Component {
  componentWillMount() {
    this.state = {
      thumbnails: [
        'http://www.placekitten.com/800/600',
        'http://www.placekitten.com/850/650',
        'http://www.placekitten.com/300/600',
        'http://www.placekitten.com/800/300',
        'http://www.placekitten.com/860/600',
        'http://www.placekitten.com/800/605',
        'http://www.placekitten.com/300/500',
        'http://www.placekitten.com/400/400',
      ]
    }
  }
  render() {
    return (
      <div id="container">
        <div id="campaignChooser">
          {this.state.thumbnails.map(function(url, i) {
            return (
              <Thumbnail url={url} key={i} />
          )})}
        </div>
      </div>
    )
  }
}
