import React, { Component } from 'react';
import './App.css';

import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar/Navbar';

import Login from './components/Login';
import FindIdPw from './components/FindIdPw';
import Register from './components/Register';

import MyPage from './components/MyPage/MyPage';
import ModifyMyInfo from './components/MyPage/ModifyMyInfo';
import ModifyPw from './components/MyPage/ModifyPw';

import List from './components/notice/List';
import Read from './components/notice/Read';
import Write from './components/notice/Write';
import Modify from './components/notice/Modify'

import cList from './components/campaign/List';
import cRead from './components/campaign/Read';
import cWrite from './components/campaign/Write';
import cModify from './components/campaign/Modify';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
        <Navbar/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/mypage" component={MyPage} />
            <Route exact path="/mypage/modifyinfo" component={ModifyMyInfo} />
            <Route exact path="/mypage/modifypw" component={ModifyPw} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
              
            <Route exact path="/findidpw" component={FindIdPw} />
            
            <Route exact path="/notice" component={List} />
            <Route exact path="/notice/read/:id?" component={Read} />     
            <Route exact path="/notice/write" component={Write} />
            <Route exact path="/notice/modify/:id?" component={Modify} />

            <Route exact path="/campaign" component={cList} />
            <Route exact path="/campaign/read/:id?" component={cRead} />     
            <Route exact path="/campaign/write" component={cWrite} />
            <Route exact path="/campaign/modify/:id?" component={cModify} />
            
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;