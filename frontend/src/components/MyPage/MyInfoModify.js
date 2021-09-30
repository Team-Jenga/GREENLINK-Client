import React, { Component } from 'react';
import '../../css/MyInfoModify.css'

import { getUserInfo, postCheckNickname, postSendAuthNum } from '../../api/apiClient';

class MyInfoModify extends Component {
    constructor() {
        super();
        this.state = {
            user_birth: "",
            member_nickname: "",
            user_email: "",
            user_phone: "",
            input_nickname: "",
            input_email: "",
            member_loc: "",
            member_num_of_family: "",
            auth_num: "",
            input_num: "",
            nickname_available: false,
            auth_num_sending: false,
            email_confirmed: false
        }
    }

    birthChange = (e) => {this.setState({user_birth: e.target.value})};
    phoneChange = (e) => {this.setState({user_phone: e.target.value})};
    emailChange = (e) => {this.setState({input_email: e.target.value})};
    nicknameChange = (e) => {this.setState({input_nickname: e.target.value})};
    locChange = (e) => {this.setState({member_loc: e.target.value})};
    familyChange = (e) => {this.setState({member_num_of_family: e.target.value})};

    loadingUserInfo = (id) => {
        getUserInfo(id).then((res) => {
            console.log(res.data.info);
            this.setState({member_nickname: res.data.info[0].member_nickname});
            this.setState({user_email: res.data.info[1].member_user_email});
            this.setState({input_nickname: res.data.info[0].member_nickname});
            this.setState({input_email: res.data.info[1].member_user_email});
            this.setState({user_birth: res.data.info[1].member_user_birth});
            this.setState({user_phone: res.data.info[1].member_user_phone});
        }).catch((err) => {
            console.log(err);
        })
    }

    onClickNicknameAvailable = () => {
        if (this.state.input_nickname !== this.state.member_nickname) {
            postCheckNickname({
                member_nickname: this.state.input_nickname
            }).then((res) => {
                console.log(res)
                if (res.data.message === "true") {
                    this.setState({nickname_available: true});
                    alert("사용 가능한 닉네임입니다");
                } else {
                    alert("이미 존재하는 닉네임입니다");
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            alert("기존 닉네임입니다. 변경할 닉네임을 입력하세요.");
        }
    }

    onClickSendAuthNum = () => {
        if (this.state.input_email !== this.state.user_email) {
            postSendAuthNum({
                user_email: this.state.input_email
            }).then((res) => {
                console.log(res);
                alert("인증번호가 전송되었습니다");
                this.setState({auth_num_sending: true});
                this.setState({auth_num: res.data.message});
            }).catch((err) => {
                console.log(err);
            })
        } else {
            alert("기존 이메일입니다. 변경할 이메일을 입력하세요.");
        }
    }

    isEmailChange = () => {
        if (this.state.input_email === this.state.user_email) {
            this.setState({email_confirmed: true});
        }
    }

    isNicknameChange = () => {
        if (this.state.input_nickname === this.state.member_nickname) {
            this.setState({nickname_available: true});
        }
    }

    // onClickModify = () => {

    // }

    componentDidMount() { 
        const { loadingUserInfo } = this;
        const userId = localStorage.getItem("id");
        loadingUserInfo(userId);
    }

    render() {
        const userId = localStorage.getItem("id");

        return(
        <div className="modify-content">
            
            <div className="modify-area top">
                <h3>{userId}님</h3>
                <h5>당신의 그린링크를 찾아보세요</h5>
            </div>

            <div className="modify-area">

                <div className="modify-area form">
                    <h4>회원정보</h4>

                    <div className="form-group">
                        <label>생년월일</label>
                        <input type="date" className="form-control" defaultValue={this.state.user_birth} 
                        onChange={this.birthChange}/>
                    </div>

                    <div className="form-group">
                        <label>닉네임</label>
                        <div className="form-group-field">
                            <input type="text" className="form-control" placeholder="닉네임" defaultValue={this.state.member_nickname} 
                            onChange={this.nicknameChange}/>

                            <button type="submit" className="btn btn-dark btn-sm btn-block" 
                            onClick={this.onClickNicknameAvailable}>중복확인</button>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label>이메일</label>
                        <div className="form-group-field">
                            <input type="email" className="form-control" placeholder="이메일" defaultValue={this.state.user_email} 
                            onChange={this.emailChange}/>

                            <button type="submit" className="btn btn-dark btn-sm btn-block" 
                            onClick={this.onClickSendAuthNum}>인증</button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>전화번호</label>
                        <input type="text" className="form-control" placeholder="전화번호" defaultValue={this.state.user_phone} 
                        onChange={this.phoneChange}/>
                    </div>

                    <div className="form-group">
                        <label>거주지역</label>
                        <input type="text" className="form-control" placeholder="거주지역" defaultValue={this.state.member_loc} 
                        onChange={this.locChange}/>
                    </div>

                    <div className="form-group">
                        <label>가구 수</label>
                        <input type="text" className="form-control" placeholder="가구 수" defaultValue={this.state.member_num_of_family} 
                        onChange={this.familyChange}/>
                    </div>

                    <button id="modify" type="submit" className="btn btn-dark btn-lg btn-block" 
                    >정보수정</button>

                </div>

            </div>

        </div>
        );
    }
}

export default MyInfoModify;