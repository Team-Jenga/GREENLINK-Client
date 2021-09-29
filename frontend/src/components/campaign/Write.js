import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';
import styled from 'styled-components';


class Write extends Component {
    constructor() {
        super();
        this.state ={
            member_id:'',
            event_title:'',
            event_location:'',
            event_management:'',
            event_period_start:'',
            event_period_end:'',
            event_url:'',
            event_image_url:'',
            event_content:''
        };
    };

    titleWrite = (e) => {this.setState({event_title: e.target.value})};
    locationWrite = (e) => {this.setState({event_location: e.target.value})};
    managementWrite = (e) => {this.setState({event_management: e.target.value})};
    pStarteWrite = (e) => {this.setState({event_period_start: e.target.value})};
    pEndWrite = (e) => {this.setState({event_period_end: e.target.value})};
    urlWrite = (e) => {this.setState({event_url: e.target.value})};
    imageUrlWrite = (e) => {this.setState({event_image_url: e.target.value})};
    contentWrite = (e) => {this.setState({event_content: e.target.value})};

    onClickSubmit = () => {
        if (this.state.event_title !== "" && this.state.event_location !== "" && this.state.event_management !== "" &&this.state.event_period_start !== "" &&this.state.event_period_end !== "" &&this.state.event_url !== "" &&this.state.event_image_url !== "" &&this.state.event_content !== "") {
            axios.post('http://ec2-52-78-154-227.ap-northeast-2.compute.amazonaws.com/api/create_event', {
                member_id: localStorage.getItem('id'),
                event_title: this.state.event_title,
                event_location: this.state.event_location,
                event_management: this.state.event_management,
                event_period_start: this.state.event_period_start,
                event_period_end: this.state.event_period_end,
                event_url: this.state.event_url,
                event_image_url: this.state.event_image_url,
                event_content: this.state.event_content,
            }).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            }).then(alert('캠페인 작성 성공'));
    } else {
            alert("모두 입력해주세요");
        };

    };

    render() {
        return(
            <div>
                <Wrap>
                    <h2>Write</h2>
                    <p>
                        <input type ="text" name="title" onChange={this.titleWrite}/>
                    </p>
                    <p>
                        <input type ="text" name="location" onChange={this.locationWrite}/>
                    </p>
                    <p>
                        <input type ="text" name="management" onChange={this.managementWrite}/>
                    </p>
                    <p>
                        <input type ="date" name="pStart" onChange={this.pStarteWrite}/>
                    </p>
                    <p>
                        <input type="date" name="pEnd" onChange={this.pEndWrite}/>
                    </p>
                    <p>
                        <input type="text" name="url" onChange={this.urlWrite}/>
                    </p>
                    <p>
                        <input type="text" name="imgaeUrl" onChange={this.imageUrlWrite}/>
                    </p>
                    <p>
                        <textarea type="text" name="content" onChange={this.contentWrite}/>
                    </p>
                    <Button>
                        <Link to="/campaign" onClick={() => {this.onClickSubmit()} }>작성</Link>
                        <Link to="/campaign">목록</Link>
                    </Button>
                </Wrap>

            </div>
        );
    }
}

const Wrap = styled.div`
    padding:20px;
    margin: 10px 230px 10px 230px;
    input {
        width:100%;
        height:20px;
        border:1px solid #ccc;
    }
    textarea {
        width: 100%;
        height: 400px;
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
`;

export default Write;