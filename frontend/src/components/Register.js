import React, { Component } from 'react';
import Navbar from './Navbar/Navbar';
import '../css/Register.css';

import axios from "axios";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            member_id: "",
            member_pw: "",
            member_name: "",
            member_nickname: "",
            member_auth: "user",
            member_user_birth: "",
            member_user_phone: "",
            member_user_email: "",
            member_user_location: "",
            member_user_num_of_family: ""
        };
    };

    idChange = (e) => {this.setState({member_id: e.target.value})};
    pwChange = (e) => {this.setState({member_pw: e.target.value})};
    nameChange = (e) => {this.setState({member_name: e.target.value})};
    nickChange = (e) => {this.setState({member_nickname: e.target.value})};
    birthChange = (e) => {this.setState({member_user_birth: e.target.value})};
    phoneChange = (e) => {this.setState({member_user_phone: e.target.value})};
    emailChange = (e) => {this.setState({member_user_email: e.target.value})};
    locChange = (e) => {this.setState({member_user_location: e.target.value})};
    famChange = (e) => {this.setState({member_user_num_of_family: e.target.value})};

    onClickSubmit = () => {
        if (this.state.member_id != "" &&
            this.state.member_pw != "" &&
            this.state.member_name != "" &&
            this.state.member_nickname != "" &&
            this.state.member_user_birth != "" &&
            this.state.member_user_phone != "" &&
            this.state.member_user_email != "" &&
            this.state.member_user_location != "" &&
            this.state.member_user_num_of_family != "") {
                axios.post("http://ec2-52-78-154-227.ap-northeast-2.compute.amazonaws.com/api/signup", {
                    member_id: this.state.member_id,
                    member_pw: this.state.member_pw,
                    member_name: this.state.member_name,
                    member_nickname: this.state.member_nickname,
                    member_user_birth: this.state.member_user_birth,
                    member_user_phone: this.state.member_user_phone,
                    member_user_email: this.state.member_user_email,
                    member_user_location: this.state.member_user_location,
                    member_user_num_of_family: this.state.member_user_num_of_family,
                    member_auth: this.state.member_auth
                }).then(function (response) {
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
                }).then(alert('회원가입 성공'));
            } else {
                alert("모두 입력해주세요");
            };
    };

    render() {
        console.log(this.state);

        return(
            <div>
                <Navbar/>
                <div className="register-content">
                    <div className="register-form">
                        <h3>Register</h3>

                        <div className="form-group">
                            <label>아이디</label>
                            <input type="text" className="form-control" placeholder="First name" onChange={this.idChange} />
                        </div>

                        <div className="form-group">
                            <label>비밀번호</label>
                            <input type="text" className="form-control" placeholder="Last name" onChange={this.pwChange}/>
                        </div>

                        <div className="form-group">
                            <label>이름</label>
                            <input type="text" className="form-control" placeholder="Enter email" onChange={this.nameChange}/>
                        </div>

                        <div className="form-group">
                            <label>닉네임</label>
                            <input type="text" className="form-control" placeholder="Enter password" onChange={this.nickChange}/>
                        </div>

                        <div className="form-group">
                            <label>생년월일</label>
                            <input type="date" className="form-control" placeholder="Enter password" onChange={this.birthChange}/>
                        </div>

                        <div className="form-group">
                            <label>전화번호</label>
                            <input type="text" className="form-control" placeholder="Enter password" onChange={this.phoneChange}/>
                        </div>

                        <div className="form-group">
                            <label>이메일</label>
                            <input type="email" className="form-control" placeholder="Enter password" onChange={this.emailChange}/>
                        </div>

                        <div className="form-group">
                            <label>거주 위치</label>
                            <input type="text" className="form-control" placeholder="Enter password" onChange={this.locChange}/>
                        </div>

                        <div className="form-group">
                            <label>가구 수</label>
                            <input type="int" className="form-control" placeholder="Enter password" onChange={this.famChange}/>
                        </div>

                        <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={this.onClickSubmit}>Register</button>
                        <p className="forgot-password text-right">
                            Already registered <a href="#">log in?</a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;