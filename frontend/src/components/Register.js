import React, { Component } from 'react';
import '../css/Register.css';

import Navbar from './Navbar/Navbar';
import axios from "axios";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            member_id: "",
            member_pw: "",
            member_name: "",
            member_user_birth: "",
            member_user_phone: "",
            member_user_email: "",
            member_auth: "user"         // 사용자 권한
        };
    };

    idChange = (e) => {this.setState({member_id: e.target.value})};
    pwChange = (e) => {this.setState({member_pw: e.target.value})};
    nameChange = (e) => {this.setState({member_name: e.target.value})};
    birthChange = (e) => {this.setState({member_user_birth: e.target.value})};
    phoneChange = (e) => {this.setState({member_user_phone: e.target.value})};
    emailChange = (e) => {this.setState({member_user_email: e.target.value})};

    onClickSubmit = () => {
        if (this.state.member_id != "" &&
            this.state.member_pw != "" &&
            this.state.member_name != "" &&
            this.state.member_user_birth != "" &&
            this.state.member_user_phone != "" &&
            this.state.member_user_email != "") {
                axios.post("http://ec2-52-78-154-227.ap-northeast-2.compute.amazonaws.com/api/signup", {
                    member_id: this.state.member_id,
                    member_pw: this.state.member_pw,
                    member_name: this.state.member_name,
                    member_user_birth: this.state.member_user_birth,
                    member_user_phone: this.state.member_user_phone,
                    member_user_email: this.state.member_user_email,
                    member_auth: this.state.member_auth
                }).then(function (response) {
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
                }).then(alert('회원가입이 완료되었습니다'));
            } else {
                alert("정보를 모두 입력해주세요");
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
                            <input type="text" className="form-control" placeholder="아이디" onChange={this.idChange} />
                        </div>

                        <div className="form-group">
                            <label>비밀번호</label>
                            <input type="text" className="form-control" placeholder="비밀번호" onChange={this.pwChange}/>
                        </div>

                        <div className="form-group">
                            <label>이름</label>
                            <input type="text" className="form-control" placeholder="이름" onChange={this.nameChange}/>
                        </div>

                        <div className="form-group">
                            <label>생년월일</label>
                            <input type="date" className="form-control" onChange={this.birthChange}/>
                        </div>

                        <div className="form-group">
                            <label>전화번호</label>
                            <input type="text" className="form-control" placeholder="전화번호" onChange={this.phoneChange}/>
                        </div>

                        <div className="form-group">
                            <label>이메일</label>
                            <input type="email" className="form-control" placeholder="이메일" onChange={this.emailChange}/>
                        </div>

                        <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={this.onClickSubmit}>회원가입</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;