import React, { Component } from 'react';
import '../css/Login.css';

import axios from "axios";
import { Link } from 'react-router-dom';
import Navbar from './Navbar/Navbar';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            member_id: "",
            member_pw: ""
        };  
    };

    idChange = (e) => {this.setState({member_id: e.target.value})};
    pwChange = (e) => {this.setState({member_pw: e.target.value})};

    onClickLogin = () => {
        if (this.state.member_id != "" &&
            this.state.member_pw != "") {
                axios.post("http://ec2-52-78-154-227.ap-northeast-2.compute.amazonaws.com/api/signin", {
                    member_id: this.state.member_id,
                    member_pw: this.state.member_pw
                }).then(function (response) {
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
                }).then(alert('로그인 성공'));
            } else {
                alert("실패!");
            };
    };

    render() {
        console.log(this.state);
        return(
            <div>
                <Navbar/>
                <div className="login-content">
                    <div className="login-form">

                        <div className="form-group">
                            <label>Id</label>
                            <input type="text" className="form-control" placeholder="아이디" onChange={this.idChange}/>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="text" className="form-control" placeholder="비밀번호" onChange={this.pwChange}/>
                        </div>

                        <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={this.onClickLogin}>로그인</button>
                        <div className="bot">
                                <Link className="bot-left" to="/register">회원가입</Link>
                                <a className="bot-right" href="#forgot">아이디/비밀번호 찾기</a>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Login;