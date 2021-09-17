import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
import CarouselContainer from './components/Home';
import About from './components/About';
import Campaign from './components/Campaign';
import Login from './components/Login';

import List from './components/notice/List';
import Read from './components/notice/Read';
import Write from './components/notice/Write';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path="/" component={CarouselContainer} />
            <Route exact path="/about" component={About} />
            <Route exact path="/campaign" component={Campaign} />
            <Route exact path="/notice" component={List} />
            <Route exact path="/login" component={Login} />
            
            <Route exact path="/notice/read/:id?" component={Read} />     
            <Route exact path="/notice/write" component={Write} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;