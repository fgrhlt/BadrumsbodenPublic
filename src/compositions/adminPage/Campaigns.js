import React, { Component } from 'react'
import ComponentTitle from '../../components/admin/ComponentTitle'
import CampaignChooser from '../../components/admin/Campaigns/CampaignChooser'
import CampaignWebshop from '../../components/admin/Campaigns/CampaignWebshop'
import CampaignServices from '../../components/admin/Campaigns/CampaignServices'

require('styles/_admin/_campaigns/campaigns.css')

export default class Campaigns extends Component {

  render() {
    return (
      <div id="campaigns">
        <ComponentTitle
          title={"Kampanj Webshop"}
          text={"Här kan du ändra kampanjen som finns i webbshopen \n" +
            "Du kan även ändra text och bild."}
            />

          <div id="container">
            <CampaignWebshop />
          </div>

          <ComponentTitle
            title={"Kampanj Tjänster"}
            text={"Här kan du ändra kampanjen som finns i tjänstesidan \n" +
              "Du kan även ändra text och bild."}
              />

            <div id="container">
              <CampaignServices />
            </div>
          </div>
        )
      }
    }
