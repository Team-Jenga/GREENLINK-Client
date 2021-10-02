import React, { Component } from 'react';
import '../css/Home.css'

import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getCampaignList } from '../api/apiClient';

import image1 from './assets/images/1.PNG'
import image2 from './assets/images/2.PNG'
import image3 from './assets/images/3.PNG'

class Home extends Component {
  constructor() {
    super();
    this.state = {
      campaign: []
    }
  }

  loadingCampaignList = () => {
    getCampaignList({order_by: "hits"}).then((res) => {
      console.log(res);
      this.setState({campaign: res.data.event_list.slice(0,5)});
    }).catch((err) => {
      console.log(err);
    })
  }

  componentDidMount() {
    const { loadingCampaignList } = this;
    loadingCampaignList();
  }

  render() {
    console.log(this.state.campaign);
    const campaignList = this.state.campaign;

    const campaignRank = campaignList.map((item, idx) => {
      if (idx < 5) {
        return (
        <li key={item.event_id}>
          <div className="rank">{idx+1}</div>
          <Link to={`/campaign/read/${item.event_id}`}>{item.event_title}</Link>
        </li>
        )
      }
    })

    return (
      <div className="home-content">
        <div className="home-area banner">

          <Carousel>
            <Carousel.Item interval={3000}>
              <img
                className="slideImage"
                src={image1}
                alt="First slide"
              />
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={3000}>
              <img
                className="slideImage"
                src={image2}
                alt="Second slide"
              />
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="slideImage"
                src={image3}
                alt="Third slide"
              />
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
          </Carousel>

        </div>

        <div className="home-area">
          <div className="ranking">
            <h2>실시간 캠페인 순위</h2>
            <ul>
              {campaignRank}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;