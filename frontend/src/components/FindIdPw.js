import React, { Component } from 'react';
import '../css/FindIdPw.css';

import { postFindId, postFindPw } from '../api/apiClient';

class FindIdPw extends Component {
    constructor() {
        super();
        this.state = {
            user_email: "",
            input_id: "",
            find_id: "",
            findIdSuccess: false
        }
    }

    findIdChange = (e) => {this.setState({user_email: e.target.value})};
    findPwChange = (e) => {this.setState({input_id: e.target.value})};

    onClickFindId = () => {
        if (this.state.user_email !== "") {
            postFindId({
                member_email: this.state.user_email
            }).then((res) => {
                console.log(res);
                this.setState({find_id: res.data.message});
                this.setState({findIdSuccess: true});
            }).catch((err) => {
                if (err.response.data.message === "email doesn't exist") {
                    alert("해당 이메일로 회원가입된 아이디가 존재하지 않습니다");
                }
            })
        } else {
            alert("회원가입 한 이메일을 입력해주세요");
        }
    }

    onClickFindPw = () => {
        if (this.state.input_id !== "") {
            postFindPw({
                member_id: this.state.input_id
            }).then((res) => {
                console.log(res);
                alert("해당 아이디의 이메일로 임시 비밀번호가 전송되었습니다");
            }).catch((err) => {
                if (err.response.data.message === "ID doesn't exist") {
                    alert("해당 아이디가 존재하지 않습니다");
                }
            })
        } else {
            alert("비밀번호를 찾으려는 아이디를 입력해주세요");
        }
    }

    render() {
        return(
        <div>

            <div className="find-content">
                    <div className="find-form">

                        <div className="form-group">
                            <label>Id 찾기</label>
                            <input type="text" className="form-control" placeholder="이메일을 입력하세요" onChange={this.findIdChange}/>
                            <button type="submit" className="btn btn-dark btn-sm btn-block" 
                            onClick={this.onClickFindId}>확인</button>
                        </div>

                        {this.state.findIdSuccess &&
                        <div className="find-id-show">
                            <div>해당 이메일로 가입된 아이디</div>
                            <span>{this.state.find_id}</span>
                        </div>}

                        <div className="form-group">
                            <label>Password 찾기</label>
                            <input type="text" className="form-control" placeholder="아이디를 입력하세요" onChange={this.findPwChange}/>
                            <button type="submit" className="btn btn-dark btn-sm btn-block" 
                            onClick={this.onClickFindPw}>확인</button>
                        </div>

                    </div>
            </div>    

        </div>
        );
    }
}

export default FindIdPw;