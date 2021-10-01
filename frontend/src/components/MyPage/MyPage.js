import React, { Component }from "react";
import '../../css/MyPage.css';

import { getUserInfo } from '../../api/apiClient';
import { Link } from 'react-router-dom';

class MyPage extends Component {
    constructor() {
        super();
        this.state = {
            member_name: "",
            member_nickname: "",
            member_birth: "",
            member_phone: "",
            member_email: "",
            member_loc: "",
            member_num_of_family: ""
        }
    }

    loadingUserInfo = (id) => {
        getUserInfo(id).then((res) => {
            console.log(res.data.info);
            this.setState({member_name: res.data.info[0].member_name});
            this.setState({member_nickname: res.data.info[0].member_nickname});
            this.setState({member_birth: res.data.info[1].member_user_birth});
            this.setState({member_phone: res.data.info[1].member_user_phone});
            this.setState({member_email: res.data.info[1].member_user_email});
            this.setState({member_loc: res.data.info[1].member_user_location});
            this.setState({member_num_of_family: res.data.info[1].member_user_num_of_family});

            if (this.state.member_loc === null &&
                this.state.member_num_of_family === null) {
                this.setState({member_loc: "거주지역을 설정해주세요"});
                this.setState({member_num_of_family: "가구 수를 설정해주세요"});
            }

        }).catch((err) => {
            console.log(err);
        })
    }

    componentDidMount() { 
        const { loadingUserInfo} = this;
        const userId = localStorage.getItem("id");
        loadingUserInfo(userId);
    }
    
    render() {
        const userId = localStorage.getItem("id");
        console.log(this.state);

        return(
            <div className="mypage-content">

                <div className="mypage-area top">
                    <h3>{userId}님</h3>
                    <h5>당신의 그린링크를 찾아보세요</h5>
                </div>

                <div className="mypage-area">

                    <div className="user-info">
                        <div>이름: {this.state.member_name}</div>
                        <div>닉네임: {this.state.member_nickname}</div>
                        <div>생일: {this.state.member_birth}</div>
                        <div>전화번호: {this.state.member_phone}</div>
                        <div>이메일: {this.state.member_email}</div>
                        <div>거주지역: {this.state.member_loc}</div>
                        <div>가구 수: {this.state.member_num_of_family}명</div>

                        <Link to="/mypage/modifypw">
                        <button id="pw-modify" type="submit" className="btn btn-dark btn-sm btn-block" 
                        >비밀번호 변경</button></Link>
                        <Link to="/mypage/modifyinfo">
                        <button id="info-modify" type="submit" className="btn btn-dark btn-sm btn-block" 
                        >회원정보 수정</button></Link>
                    </div>

                    <div className="bookmark-campaign">
                        <h3>캠페인 즐겨찾기</h3>
                    </div>

                </div>

            </div>
        );
    }
}

export default MyPage;