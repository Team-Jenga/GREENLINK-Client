import React, { Component } from 'react';
import '../css/Home.css'

import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getCampaignList, getNoticeList } from '../api/apiClient';

import image1 from './assets/images/1.PNG'
import image2 from './assets/images/2.PNG'
import image3 from './assets/images/3.PNG'

class Home extends Component {
  constructor() {
    super();
    this.state = {
      campaign: [],
      notice: []
    }
  }

  loadingCampaignList = () => {
    getCampaignList({order_by: "hits"}).then((res) => {
      this.setState({campaign: res.data.event_list.slice(0,9)});
    }).catch((err) => {
      console.log(err);
    })
  }

  loadingNoticeList = () => {
    getNoticeList().then((res) => {
      console.log(res);
      this.setState({notice: res.data.data.slice(0,9)});
    }).catch((err) => {
      console.log(err);
    })
  }

  componentDidMount() {
    const { loadingCampaignList, loadingNoticeList } = this;
    loadingCampaignList();
    loadingNoticeList();
  }

  render() {
    console.log(this.state.campaign);
    console.log(this.state.notice);
    const campaignList = this.state.campaign;
    const getNotice = this.state.notice;
    
    const campaignRank = campaignList.map((item, idx)=> {
      if (idx < 10) {
        return (
          <li key={item.event_id}>
            <div className="rank">{idx+1}</div>
            <Link to={`/campaign/read/${item.event_id}`}>{item.event_title}</Link>
          </li>
        )
      }
    })

    const noticeList = getNotice.map((item, idx)=> {
      if (idx < 10) {
        return (
          <li key={item.id}>
            <Link to={`/notice/read/${item.id}`}>{item.notice_title}</Link>
          </li>
        )
      }
    })

    return (
      <div className="home-content">
        <div className="banner">

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
            <h3>실시간 <span className = "topten">TOP 10</span> 🔥</h3>
            <ul>
              {campaignRank}
            </ul>
          </div>

          <div className="notice">
            <h3>공지사항 📢</h3>
            <ul>
              {noticeList}
            </ul>
          </div>

        </div>
      </div>
    );
  }
}

export default Home;