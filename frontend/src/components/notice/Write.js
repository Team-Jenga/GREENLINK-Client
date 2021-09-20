import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';


class Write extends Component {
    constructor() {
        super();
        this.state ={
            notice_title:'',
            notice_content:'',
            member:'',
            created_at:new Date()
        };
    };

    // idWrite = (e) => {this.setState({id: e.target.value})};
    titleWrite = (e) => {this.setState({notice_title: e.target.value})};
    contentWrite = (e) => {this.setState({notice_content: e.target.value})};
    // memberWrite = (e) => {this.setState({member: e.target.value})};
    // createWrite = (e) => {this.setState({created_at: e.target.value})};

    onClickSubmit = () => {
        if (this.state.notice_title !== "" && this.state.notice_content !== "") {
        axios.post('http://ec2-52-78-154-227.ap-northeast-2.compute.amazonaws.com/api/notice', {
            notice_title: this.state.notice_title,
            notice_content: this.state.notice_content,
            member: this.state.member,
            created_at: this.state.created_at
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        }).then(alert('공지사항 작성 성공'));
    } else {
        alert("모두 입력해주세요");
        };
    };

    render() {
        return(
            <Wrap>
                <h2>Write</h2>
                <p>
                    <input type ="text" name="title" onChange={this.titleWrite}/>
                </p>
                <p>
                    <textarea type="text" name="content" onChange={this.contentWrite}/>
                </p>
                <Button>
                    <Link to="/notice" onClick={() => {this.onClickSubmit()} }>전송하기</Link>
                    <Link to="/notice">목록</Link>
                </Button>
            </Wrap>
        );
    }
}


const Wrap = styled.div`
    padding:20px;
    input {
        width:100%;
        height:20px;
        border:1px solid #ccc;
    }
    textarea {
        width: 100%;
        height: 100px;
        border: 1px solid #ccc;
    }
`;

const Button = styled.div`
    border-top: 1px solid #eee;
    padding:20px;
    button {
        float:right;
        padding:10px 20px;
        border-radius:5px;
        text-decoration:none;
        background:#212121;
        color:#fff;
        font-size:16px;
    }
    a{
        float:right;
        padding: 10px 20px;
        border-radius: 5px;
        text-decoration:none;
        border:1px solid #ddd;
        color:#424242;
        font-size:16px;
    }
    & > button + a{
        margin-right:5px;
    }
}`;

export default Write;