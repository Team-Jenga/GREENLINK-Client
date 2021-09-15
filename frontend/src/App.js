import React, { Component } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar/Navbar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
      </div>
    );
  }
}

export default App;