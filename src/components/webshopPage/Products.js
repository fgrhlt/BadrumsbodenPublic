import React, { Component } from 'react'

require('styles/_webshopPage/products.css')

export default class Products extends Component {

  render() {
    return (
      <div id="products">
        <section>
          <ul>
            <li>Kategori 1</li>
            <li>Kategori 2</li>
            <li>Kategori 3</li>
            <li>Kategori 4</li>
            <li>Kategori 5</li>
            <li>Kategori 6</li>
            <li>Kategori 7</li>
          </ul>
        </section>

        <section>
          <div>
            <figure style={{backgroundImage:'url(http://placekitten.com/800/600)'}} />
            <h4>Badkar F45</h4>
            <p>Ett fett stort badkar som är grått</p>

            <div className="buy-btn">
                <span>350:-</span>
                <span>Mer info</span>
            </div>
          </div>

          <div>
            <figure style={{backgroundImage:'url(http://placekitten.com/850/600)'}} />
            <h4>Badkar F45</h4>
            <p>Ett fett stort badkar som är grått</p>

            <div className="buy-btn">
                <span>350:-</span>
                <span><figure /></span>
            </div>
          </div>

          <div>
            <figure style={{backgroundImage:'url(http://placekitten.com/400/600)'}} />
            <h4>Badkar F45 Babord styrbord</h4>
            <p>Ett fett stort badkar som är grått</p>

            <div className="buy-btn">
                <span>350:-</span>
                <span><figure /></span>
            </div>
          </div>

          <div>
            <figure style={{backgroundImage:'url(http://placekitten.com/700/600)'}} />
            <h4>Badkar F45</h4>
            <p>Ett fett stort badkar som är grått</p>

            <div className="buy-btn">
                <span>350:-</span>
                <span><figure /></span>
            </div>
          </div>

          <div>
            <figure style={{backgroundImage:'url(http://placekitten.com/834/600)'}} />
            <h4>Badkar F45</h4>
            <p>Ett fett stort badkar som är grått</p>

            <div className="buy-btn">
                <span>350:-</span>
                <span><figure /></span>
            </div>
          </div>

          <div>
            <figure style={{backgroundImage:'url(http://placekitten.com/400/340)'}} />
            <h4>Badkar F45</h4>
            <p>Ett fett stort badkar som är grått</p>

            <div className="buy-btn">
                <span>350:-</span>
                <span><figure /></span>
            </div>
          </div>

          <div>
            <figure style={{backgroundImage:'url(http://placekitten.com/400/300)'}} />
            <h4>Badkar F45</h4>
            <p>Ett fett stort badkar som är grått</p>

            <div className="buy-btn">
                <span>350:-</span>
                <span><figure /></span>
            </div>
          </div>

          <div>
            <figure style={{backgroundImage:'url(http://placekitten.com/800/500)'}} />
            <h4>Badkar F45</h4>
            <p>Ett fett stort badkar som är grått</p>

            <div className="buy-btn">
                <span>350:-</span>
                <span><figure /></span>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
