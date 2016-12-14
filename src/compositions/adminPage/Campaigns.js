import React, { Component } from 'react'
import ComponentTitle from '../../components/admin/ComponentTitle'
import CampaignChooser from '../../components/admin/Campaigns/CampaignChooser'
import Campaign from '../../components/admin/Campaigns/Campaign'

require('styles/_admin/_campaigns/campaigns.css')

export default class Campaigns extends Component {

  render() {
    return (
      <div id="campaigns">
        <ComponentTitle
          title={"Kampanj"}
          text={"Här kan du ändra kampanjen som finns i webbshopen \n" +
                "Du kan även ändra text och bild."}
        />

        <div id="container">
          <Campaign />
        </div>
      </div>
    )
  }
}
