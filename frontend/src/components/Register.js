import React, { Component } from 'react';
import '../css/Register.css';

import { postCheckId, postCheckNickname, postSignUp, postSendAuthNum } from '../api/apiClient';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            member_id: "",
            member_pw: "",
            member_name: "",
            user_birth: "",
            user_phone: "",
            user_email: "",
            member_nickname: "",
            member_auth: "user",         // 사용자 권한
            input_num: "",
            auth_num: "",
            auth_num_sending: false,
            email_confirmed: false,
            id_available: false,
            nickname_available: false
        }
    }

    idChange = (e) => {this.setState({member_id: e.target.value})};
    pwChange = (e) => {this.setState({member_pw: e.target.value})};
    nameChange = (e) => {this.setState({member_name: e.target.value})};
    birthChange = (e) => {this.setState({user_birth: e.target.value})};
    phoneChange = (e) => {this.setState({user_phone: e.target.value})};
    emailChange = (e) => {this.setState({user_email: e.target.value})};
    nicknameChange = (e) => {this.setState({member_nickname: e.target.value})};
    inputnumChange = (e) => {this.setState({input_num: e.target.value})};
    
    onClickIdAvailable = () => {
        if (this.state.member_id !== "") {
            postCheckId({
                member_id: this.state.member_id
            }).then((res) => {
                console.log(res)
                if (res.data.message === "true") {
                    this.setState({id_available: true});
                    alert("사용 가능한 아이디입니다");
                } else {
                    alert("이미 존재하는 아이디입니다");
                };
            }).catch((err) => {
                console.log(err);
            })
        } else {
            alert("아이디를 입력하세요");
        }
    }
    
    onClickNicknameAvailable = () => {
        if (this.state.member_nickname !== "") {
            postCheckNickname({
                member_nickname: this.state.member_nickname
            }).then((res) => {
                console.log(res)
                if (res.data.message === "true") {
                    this.setState({nickname_available: true});
                    alert("사용 가능한 닉네임입니다");
                } else {
                    alert("이미 존재하는 닉네임입니다");
                };
            }).catch((err) => {
                console.log(err);
            })
        } else {
            alert("닉네임을 입력하세요");
        }
    }

    onClickSendAuthNum = () => {
        if (this.state.user_email !== "") {
            postSendAuthNum({
                member_email: this.state.user_email
            }).then((res) => {
                console.log(res);
                alert("인증번호가 전송되었습니다");
                this.setState({auth_num_sending: true});
                this.setState({auth_num: res.data.message});
            }).catch((err) => {
                console.log(err);
            })
        } else {
            alert("이메일을 입력하세요");
        }
    }

    onClickCheckAuthNum = () => {
        if (this.state.input_num !== "") {
            if (this.state.input_num === this.state.auth_num) {
                this.setState({email_confirmed: true});
                alert("이메일이 인증되었습니다");
            } else {
                alert("인증번호가 틀렸습니다");
            }
        } else {
            alert("인증번호를 입력해주세요");
        }
    }

    onClickSubmit = () => {
        if (this.state.member_id !== "" &&
            this.state.member_pw !== "" &&
            this.state.member_name !== "" &&
            this.state.user_birth !== "" &&
            this.state.user_phone !== "" &&
            this.state.user_email !== "" &&
            this.state.member_nickname !== "" &&
            this.state.id_available &&
            this.state.nickname_available &&
            this.state.email_confirmed) {
                postSignUp({
                    member_id: this.state.member_id,
                    member_pw: this.state.member_pw,
                    member_name: this.state.member_name,
                    member_user_birth: this.state.user_birth,
                    member_user_phone: this.state.user_phone,
                    member_user_email: this.state.user_email,
                    member_nickname: this.state.member_nickname,
                    member_auth: this.state.member_auth
                }).then((res) => {
                    console.log(res)
                    alert("회원가입이 완료되었습니다");
                    document.location.href = "/login";
                }).catch((err) => {
                    console.log(err);
                });
            } else {
                if (this.state.member_id === "" ||
                    this.state.member_pw === "" ||
                    this.state.member_name === "" ||
                    this.state.user_birth === "" ||
                    this.state.user_phone === "" ||
                    this.state.user_email === "" ||
                    this.state.member_nickname === "") {
                        alert("정보를 모두 입력해주세요");
                    } else if (!this.state.id_available) {
                        alert("아이디 중복을 확인해주세요");
                    } else if (!this.state.nickname_available) {
                        alert("닉네임 중복을 확인해주세요");
                    } else if (!this.state.email_confirmed) {
                        alert("이메일 인증을 완료해주세요");
                    }
            }
    }

    render() {
        console.log(this.state);
        return(
            <div>
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
                            <div className="form-group-field">
                                <input type="text" className="form-control" placeholder="아이디" onChange={this.idChange} />
                                <button type="submit" className="btn btn-dark btn-sm btn-block" 
                                onClick={this.onClickIdAvailable}>중복확인</button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>비밀번호</label>
                            <input type="password" className="form-control" placeholder="비밀번호" onChange={this.pwChange}/>
                        </div>

                        <div className="form-group">
                            <label>닉네임</label>
                            <div className="form-group-field">
                                <input type="text" className="form-control" placeholder="닉네임" onChange={this.nicknameChange}/>
                                <button type="submit" className="btn btn-dark btn-sm btn-block" 
                                onClick={this.onClickNicknameAvailable}>중복확인</button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>전화번호</label>
                            <input type="text" className="form-control" placeholder="전화번호" onChange={this.phoneChange}/>
                        </div>

                        <div className="form-group">
                            <label>이메일</label>
                            <div className="form-group-field">
                                <input type="email" className="form-control" placeholder="이메일" onChange={this.emailChange}/>
                                <button type="submit" className="btn btn-dark btn-sm btn-block" 
                                onClick={this.onClickSendAuthNum}>인증</button>
                            </div>
                        </div>

                        {this.state.auth_num_sending &&
                        <div className="form-group">
                            <label>인증번호</label>
                            <div className="form-group-field">
                                <input type="text" className="form-control" placeholder="인증번호" onChange={this.inputnumChange}/>
                                <button type="submit" className="btn btn-dark btn-sm btn-block" 
                                onClick={this.onClickCheckAuthNum}>확인</button>
                            </div>
                        </div>}

                        <button id="register" type="submit" className="btn btn-dark btn-lg btn-block" 
                        onClick={this.onClickSubmit}>회원가입</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;