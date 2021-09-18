import React, { Component } from 'react';
import './App.css';

import {BrowserRouter, Route, Switch} from "react-router-dom";
import CarouselContainer from './components/Home';
import About from './components/About';
import Campaign from './components/Campaign';
import Notice from './components/Notice';
import Login from './components/Login';
import Register from './components/Register';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={CarouselContainer} />
            <Route exact path="/about" component={About} />
            <Route exact path="/campaign" component={Campaign} />
            <Route exact path="/notice" component={Notice} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;