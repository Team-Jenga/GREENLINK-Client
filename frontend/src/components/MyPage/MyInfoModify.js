import React, { Component } from 'react';
import Select from 'react-select';
import { locOptions } from './LocOptions';
import '../../css/MyInfoModify.css'

import { getUserInfo, postCheckNickname, postSendAuthNum, putModifyUserInfo } from '../../api/apiClient';

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
    inputnumChange = (e) => {this.setState({input_num: e.target.value})};
    nicknameChange = (e) => {this.setState({input_nickname: e.target.value})};
    familyChange = (e) => {this.setState({member_num_of_family: e.target.value})};
    locChange = (e) => {this.setState({member_loc: e.value})};

    loadingUserInfo = (id) => {
        getUserInfo(id).then((res) => {
            console.log(res.data.info);
            this.setState({member_nickname: res.data.info[0].member_nickname});
            this.setState({user_email: res.data.info[1].member_user_email});
            this.setState({input_nickname: res.data.info[0].member_nickname});
            this.setState({input_email: res.data.info[1].member_user_email});
            this.setState({user_birth: res.data.info[1].member_user_birth});
            this.setState({user_phone: res.data.info[1].member_user_phone});
            this.setState({member_loc: res.data.info[1].member_user_location});
            this.setState({member_num_of_family: res.data.info[1].member_user_num_of_family});

            if (this.state.member_loc === null &&
                this.state.member_num_of_family === null) {
                this.setState({member_loc: ""})
                this.setState({member_num_of_family: ""})
            }

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
                member_email: this.state.input_email
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

    onClickModify = () => {
        const id = localStorage.getItem("id");

        if (this.state.user_birth !== "" &&
            this.state.user_phone !== "" &&
            this.state.input_email !== "" &&
            this.state.input_nickname !== "" &&
            this.state.member_loc !== "" &&
            this.state.member_num_of_family !== "" &&
            ((this.state.input_nickname === this.state.member_nickname &&
            this.state.input_email === this.state.user_email) ||
            (this.state.input_nickname === this.state.member_nickname && this.state.email_confirmed) || 
            (this.state.nickname_available && this.state.input_email === this.state.user_email) ||
            (this.state.nickname_available && this.state.email_confirmed))) {
                putModifyUserInfo({
                    member_nickname: this.state.input_nickname,
                    member_birth: this.state.user_birth,
                    member_phone: this.state.user_phone,
                    member_email: this.state.input_email,
                    member_location: this.state.member_loc,
                    member_num_of_family: this.state.member_num_of_family
                }, id).then((res) => {
                    console.log(res);
                    alert("회원정보가 수정되었습니다");
                    document.location.href = "/mypage";
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                if (this.state.user_birth === "" ||
                this.state.user_phone === "" ||
                this.state.input_email === "" ||
                this.state.input_nickname === "" ||
                this.state.member_loc === "" ||
                this.state.member_num_of_family === "") {
                    alert("변경할 정보를 모두 입력해주세요");
                } else if (this.state.input_nickname !== this.state.member_nickname && !this.state.nickname_available) {
                    alert("변경할 닉네임의 중복을 확인해주세요");
                }
                 else if (this.state.input_email !== this.state.user_email && !this.state.email_confirmed) {
                    alert("변경할 이메일의 인증을 완료해주세요");
                }
            }
    }

    componentDidMount() { 
        const { loadingUserInfo } = this;
        const userId = localStorage.getItem("id");
        loadingUserInfo(userId);
    }

    render() {
        const userId = localStorage.getItem("id");
        const userLoc = this.state.member_loc;
        console.log(this.state);

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

                    {this.state.auth_num_sending &&
                        <div className="form-group">
                            <label>인증번호</label>
                            <div className="form-group-field">
                                <input type="text" className="form-control" placeholder="인증번호" onChange={this.inputnumChange}/>
                                <button type="submit" className="btn btn-dark btn-sm btn-block" 
                                onClick={this.onClickCheckAuthNum}>확인</button>
                            </div>
                        </div>}

                    <div className="form-group">
                        <label>전화번호</label>
                        <input type="text" className="form-control" placeholder="전화번호" defaultValue={this.state.user_phone} 
                        onChange={this.phoneChange}/>
                    </div>

                    <div className="form-group">
                        <label>거주지역</label>
                        <Select options={locOptions} placeholder="거주지역을 선택해주세요" 
                        value={locOptions.find(opt => {
                            return opt.value === userLoc
                        })}
                        onChange={this.locChange}/>
                    </div>

                    <div className="form-group">
                        <label>가구 수</label>
                        <input type="text" className="form-control" placeholder="가구 수" defaultValue={this.state.member_num_of_family} 
                        onChange={this.familyChange}/>
                    </div>

                    <button id="modify" type="submit" className="btn btn-dark btn-lg btn-block" 
                    onClick={this.onClickModify}>정보수정</button>

                </div>

            </div>

        </div>
        );
    }
}

export default MyInfoModify;