import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';
import styled from 'styled-components';

class Modify extends Component {
    constructor() {
        super();
        this.state ={
            id:'',
            notice_title:'',
            notice_content:'',
            member:'',
            created_at:'',
        };
    };
    
    titleWrite = (e) => {this.setState({notice_title: e.target.value})};
    contentWrite = (e) => {this.setState({notice_content: e.target.value})};

    loadingData = async() => {
        try {
            const {id} = this.props.match.params;
            console.log(id)
            const response = await axios.get(`http://ec2-52-78-154-227.ap-northeast-2.compute.amazonaws.com/api/notice/${id}`);
            this.setState({
                id:id,
                notice_title:response.data.notice_title,
                notice_content:response.data.notice_content,
            });
        } catch(e) {
            console.log(e);
        }
    };

    onClickSubmit = () => {
        if (this.state.notice_title !== "" && this.state.notice_content !== "") {
        axios.put(`http://ec2-52-78-154-227.ap-northeast-2.compute.amazonaws.com/api/notice/${this.state.id}`, {
            notice_title: this.state.notice_title,
            notice_content: this.state.notice_content,
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        }).then(alert('공지사항 수정 성공'));
    } else {
        alert("모두 입력해주세요");
        };
    };

    componentDidMount() { 
        const { loadingData } = this; 
        loadingData(); 
    };

    render() {
        return (
            <div>
                <Wrap>
                    <h2><input type="text" name="title" onChange={this.titleWrite} defaultValue={this.state.notice_title}></input></h2>
                    <p><textarea type="text" name="content" onChange={this.contentWrite} defaultValue={this.state.notice_content}></textarea></p>
                    <h5 align="right"> {this.state.created_at} </h5>
                    <Button>
                        <Link to="/notice" onClick={() => {this.onClickSubmit()}}>수정</Link>
                    </Button>
                </Wrap>
            </div>
        );
    }
}

const Wrap = styled.div`
    padding:20px;
    margin: 10px 230px 10px 230px;
    h2 {
        padding-bottom:20px;
        border-bottom:1px solid #ccc;
    }
    p {
        min-height: 200px;
    }
    textarea {
        width: 100%;
        height: 400px;
        border: 1px solid #ccc;
    }
    input {
        width:100%;
        height:40px;
        border:1px solid #ccc;
    }
`;

const Button = styled.div`
    border-top: 1px solid #eee;
    padding:20px;
    a{
        float:right;
        padding: 10px 20px;
        border-radius: 5px;
        text-decoration:none;
        border: 1px solid #ddd;
        font-size:16px,
        color:#424242;
    }
    a + a{
        margin-right: 5px;
    }
`;

export default Modify;