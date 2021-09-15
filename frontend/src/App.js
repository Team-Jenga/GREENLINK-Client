import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import CarouselContainer from './components/carouselContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <CarouselContainer/>
      </div>
    );
  }
}

export default App;