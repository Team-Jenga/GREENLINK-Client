import React, { Component } from 'react';
import Navbar from './Navbar/Navbar';
import '../css/Login.css';

import axios from "axios";

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
                <div className="login-form">
                    <h3>Log in</h3>

                    <div className="form-group">
                        <label>Id</label>
                        <input type="text" className="form-control" placeholder="Enter email" onChange={this.idChange}/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="text" className="form-control" placeholder="Enter password" onChange={this.pwChange}/>
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={this.onClickLogin}>Sign in</button>
                    <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p>
                </div>
            </div>
        );
    }
}

export default Login;