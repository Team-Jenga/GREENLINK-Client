import React, { Component } from 'react';
import { Carousel, Nav } from 'react-bootstrap';

import image1 from './assets/images/1.PNG'
import image2 from './assets/images/2.PNG'
import image3 from './assets/images/3.PNG'
import Navbar from './Navbar/Navbar';

class CarouselContainer extends Component {
    render() {
        return (
          <div>
            <Navbar/>
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
        );
    }
}

export default CarouselContainer;