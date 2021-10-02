import React, { Component }from "react";
import '../../css/ModifyPw.css'

import { putModifyPw } from "../../api/apiClient";

class ModifyPw extends Component {
    constructor() {
        super();
        this.state = {
            member_id: "",
            new_password: "",
            new_password_check: ""
        }
    }

    newPwChange = (e) => {this.setState({new_password: e.target.value})};
    newPwCheckChange = (e) => {this.setState({new_password_check: e.target.value})};

    onClickModifyPw = () => {
        const id = localStorage.getItem("id");

        if (this.state.new_password !== "" &&
            this.state.new_password_check !== "" &&
            this.state.new_password === this.state.new_password_check) {
                putModifyPw({
                    member_pw: this.state.new_password
                }, id).then((res) => {
                    console.log(res)
                    alert("비밀번호가 수정되었습니다. 새로운 비밀번호로 로그인하세요");
                    localStorage.clear();
                    document.location.replace("/login");
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                if (this.state.new_password === "") {
                    alert("새 비밀번호를 입력하세요");
                } else if (this.state.new_password_check === "") {
                    alert("새 비밀번호 확인을 입력하세요");
                } else if (this.state.new_password !== this.state.new_password_check) {
                    alert("새 비밀번호와 확인이 일치하지 않습니다");
                }
            }
    }

    onClickCancel = () => {
        document.location.reload();
    }

    render() {
        const userId = localStorage.getItem("id");
        console.log(this.state);

        return (
            <div className="modifypw-content">

                <div className="modifypw-area top">
                    <h3>{userId}님</h3>
                    <h5>당신의 그린링크를 찾아보세요</h5>
                </div>

                <div className="modifypw-area">

                    <div className="modifypw-area form">
                        <h4>비밀번호 변경</h4>

                        <div className="form-group">
                            <label>새 비밀번호</label>
                            <input type="password" className="form-control" placeholder="새 비밀번호" onChange={this.newPwChange}/>
                        </div>     
                        
                        <div className="form-group">
                            <label>새 비밀번호 확인</label>
                            <input type="password" className="form-control" placeholder="새 비밀번호 확인" onChange={this.newPwCheckChange}/>
                        </div>

                        <button id="modifypw" type="submit" className="btn btn-dark btn-lg btn-block" 
                        onClick={this.onClickModifyPw}>확인</button>
                        
                        <button id="modifypw-cancel" type="submit" className="btn btn-dark btn-lg btn-block" 
                        onClick={this.onClickCancel}>취소</button>
                    </div>

                </div>

            </div>
        );
    }
}

export default ModifyPw;