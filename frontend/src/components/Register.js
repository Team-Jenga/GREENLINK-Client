import React, { Component } from 'react';
import '../css/Register.css';

import { postCheckId, postCheckNickname, postSignUp } from '../api/apiClient';
import Navbar from './Navbar/Navbar';

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
            member_nickname: "",
            member_auth: "user"         // 사용자 권한
        };
    };

    idChange = (e) => {this.setState({member_id: e.target.value})};
    pwChange = (e) => {this.setState({member_pw: e.target.value})};
    nameChange = (e) => {this.setState({member_name: e.target.value})};
    birthChange = (e) => {this.setState({member_user_birth: e.target.value})};
    phoneChange = (e) => {this.setState({member_user_phone: e.target.value})};
    emailChange = (e) => {this.setState({member_user_email: e.target.value})};
    nicknameChange = (e) => {this.setState({member_nickname: e.target.value})};

    onClickSubmit = () => {
        if (this.state.member_id != "" &&
            this.state.member_pw != "" &&
            this.state.member_name != "" &&
            this.state.member_user_birth != "" &&
            this.state.member_user_phone != "" &&
            this.state.member_user_email != "" &&
            this.state.member_nickname != "") {
                postSignUp({
                    member_id: this.state.member_id,
                    member_pw: this.state.member_pw,
                    member_name: this.state.member_name,
                    member_user_birth: this.state.member_user_birth,
                    member_user_phone: this.state.member_user_phone,
                    member_user_email: this.state.member_user_email,
                    member_nickname: this.state.member_nickname,
                    member_auth: this.state.member_auth
                }).then(function (res) {
                    console.log(res)
                    alert("회원가입이 완료되었습니다");
                    document.location.href = "/login";
                }).catch(function(err) {
                    console.log(err.response);
                });
            } else {
                alert("정보를 모두 입력해주세요");
            };
    };

    onClickIdAvailable = () => {
        if (this.state.member_id != "") {
            postCheckId({
                member_id: this.state.member_id
            }).then(function(res) {
                console.log(res)
                if (res.data.message === "true") {
                    alert("사용 가능한 아이디입니다");
                } else {
                    alert("이미 존재하는 아이디입니다");
                };
            }).catch(function(err) {
                console.log(err.response);
            })
        } else {
            alert("아이디를 입력하세요");
        }
    };

    onClickNicknameAvailable = () => {
        if (this.state.member_id != "") {
            postCheckNickname({
                member_nickname: this.state.member_nickname
            }).then(function(res) {
                console.log(res)
                if (res.data.message === "true") {
                    alert("사용 가능한 닉네임입니다");
                } else {
                    alert("이미 존재하는 닉네임입니다");
                };
            }).catch(function(err) {
                console.log(err.response);
            })
        } else {
            alert("닉네임을 입력하세요");
        }
    };

    render() {
        console.log(this.state);

        return(
            <div>
                <Navbar/>
                <div className="register-content">
                    <div className="register-form">
                        
                        <div className="form-group">
                            <label>이름</label>
                            <input type="text" className="form-control" placeholder="이름" onChange={this.nameChange}/>
                        </div>

                        <div className="form-group">
                            <label>생년월일</label>
                            <input type="date" className="form-control" onChange={this.birthChange}/>
                        </div>

                        <div className="form-group">
                            <label>아이디</label>
                            <input type="text" className="form-control" placeholder="아이디" onChange={this.idChange} />
                            <button type="submit" className="btn btn-dark btn-sm btn-block" 
                            onClick={this.onClickIdAvailable}>중복검사</button>
                        </div>

                        <div className="form-group">
                            <label>비밀번호</label>
                            <input type="password" className="form-control" placeholder="비밀번호" onChange={this.pwChange}/>
                        </div>

                        <div className="form-group">
                            <label>닉네임</label>
                            <input type="text" className="form-control" placeholder="닉네임" onChange={this.nicknameChange}/>
                            <button type="submit" className="btn btn-dark btn-sm btn-block" 
                            onClick={this.onClickNicknameAvailable}>중복검사</button>
                        </div>

                        <div className="form-group">
                            <label>전화번호</label>
                            <input type="text" className="form-control" placeholder="전화번호" onChange={this.phoneChange}/>
                        </div>

                        <div className="form-group">
                            <label>이메일</label>
                            <input type="email" className="form-control" placeholder="이메일" onChange={this.emailChange}/>
                        </div>

                        <button type="submit" className="btn btn-dark btn-lg btn-block" 
                        onClick={this.onClickSubmit}>회원가입</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;