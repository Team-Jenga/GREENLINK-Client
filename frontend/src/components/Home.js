import React, { Component } from 'react';
import '../css/Home.css'

import { Carousel } from 'react-bootstrap';

import image1 from './assets/images/1.PNG'
import image2 from './assets/images/2.PNG'
import image3 from './assets/images/3.PNG'

class Home extends Component {
    render() {
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
                <h3>실시간 캠페인 순위</h3>

              </div>
            </div>
          </div>
        );
    }
}

export default Home;