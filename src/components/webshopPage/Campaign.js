import React, { Component } from 'react'
require('styles/_webshopPage/campaign.css')

export default class Campaign extends Component {

  componentWillMount() {
    var config = {
      apiKey: "AIzaSyBQnvDISWtShRbrtheOm2uvAP_iGie6sGM",
      authDomain: "badrumsboden-c7b46.firebaseapp.com",
      databaseURL: "https://badrumsboden-c7b46.firebaseio.com",
      storageBucket: "badrumsboden-c7b46.appspot.com",
    }
    firebase.initializeApp(config)

    this.state = {
      campaignItem: []
    }

    this.loadFromDBCampaign('campaign', 'imageURLs')
  }

  loadFromDBCampaign(databaseFolderRoot, databaseFolderChild) {
    var ref = firebase.database()
      .ref(databaseFolderRoot)
      .child(databaseFolderChild)

      ref.on('value', (snapshot) => {
        var items = []

        // Loop through imageURLs/{objects} in order
        snapshot.forEach( (childSnapshot) => {

          //The object
          var item = childSnapshot.val()

          //Get the key of object and push into object
          item['key'] = childSnapshot.key

          //Push object to array with items
          items.push(item)

          })

          this.setState({
            campaignItem: items
          })

        })
    }

  render() {

    //console.log('this.state.campaignItem', (this.state.campaignItem[0]).name)
    /* Data from database */
    var styleVar = {
      backgroundImage: 'url( https://firebasestorage.googleapis.com/v0/b/badrumsboden-c7b46.appspot.com/o/gallery%2Fimagescampaign.jpg?alt=media&token=6b02aedb-b463-4660-a880-5d0c73e76bd8 )',
      color: '#fff',
    }

    return (
      <div id="campaign" style={styleVar}>

        <section>
          <h1>Kampanj</h1>
          <p>
            Köp en toalettstol idag och få 200:- rabatt.
            Du kommer tjäna massor med pengar på detta
            erbjudande! <br /><br />

            Först till kvarn gäller och allt är bra.
            Vi finns på Kabelvägen 8. Öppet 8-16
          </p>
        </section>

        <button className="btn greenButton">Till erbjudande</button>
      </div>

    )
  }
}
