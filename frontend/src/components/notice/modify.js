import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import {Link} from 'react-router-dom';

import axios from 'axios';
import styled from 'styled-components';

class Read extends Component {
    constructor() {
        super();
        this.state ={
            id:'',
            board:[],
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
                board:response.data,
                id:id,
            });
            console.log(response.data);
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
    }

    render() {
        const {board} = this.state; 
        return (
            <div>
                
                <Navbar/>
                <Wrap>
                    <h2><input type="text" name="title" onChange={this.titleWrite} defaultValue={board.notice_title}></input></h2>
                    <h5 align="right"> {board.created_at} </h5>
                    <h5 align="right"> {localStorage.getItem('id')} </h5>
                    <p><textarea type="text" name="content" onChange={this.contentWrite} defaultValue={board.notice_content}></textarea></p>
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
    h2 {
        padding-bottom:20px;
        border-bottom:1px solid #ccc;
    }
    p {
        min-height: 200px;
    }
    textarea {
        width: 100%;
        height: 100px;
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
}`;

export default Read;