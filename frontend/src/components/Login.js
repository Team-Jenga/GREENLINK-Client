import React, { Component } from 'react';
import '../css/Login.css';

import { postSignIn } from '../api/apiClient';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            member_id: "",
            member_pw: ""
        }
    }

    idChange = (e) => {this.setState({member_id: e.target.value})};
    pwChange = (e) => {this.setState({member_pw: e.target.value})};

    onClickLogin = () => {
        if (this.state.member_id !== "" &&
            this.state.member_pw !== "") {
                let member_id = this.state.member_id;
                postSignIn({
                    member_id: this.state.member_id,
                    member_pw: this.state.member_pw
                }).then(function(res) {

                    // 로그인 성공
                    if (res.status === 200) {
                        localStorage.setItem("id", member_id);
                        localStorage.setItem("auth", res.data.auth)
                        document.location.href = "/";
                    } else if (res.status === 201) {
                        alert("비밀번호가 틀렸습니다");
                    } else if (res.status === 202) {
                        alert("존재하지 않는 아이디입니다");
                    }
                }).catch(function(err) {
                    console.log(err);
                })
            } else if (this.state.member_id === "") {
                alert("아이디를 입력해주세요");
            } else if (this.state.member_pw === "") {
                alert("비밀번호를 입력해주세요");
            }
    }

    render() {
        console.log(this.state);
        return(
            <div>

                <div className="login-content">
                    <div className="login-form">

                        <div className="form-group">
                            <label>Id</label>
                            <input type="text" className="form-control" placeholder="아이디" onChange={this.idChange}/>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="비밀번호" onChange={this.pwChange}/>
                        </div>

                        <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={this.onClickLogin}>로그인</button>
                        <div className="bot">
                                <Link className="bot-left" to="/register">회원가입</Link>
                                <Link className="bot-right" to="/findidpw">아이디/비밀번호 찾기</Link>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Login;