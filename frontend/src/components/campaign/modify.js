import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';
import styled from 'styled-components';

class Modify extends Component {
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
            event_preview_url:'',
            event_content:''
        };
    };
    
    titleWrite = (e) => {this.setState({event_title: e.target.value})};
    locationWrite = (e) => {this.setState({event_location: e.target.value})};
    managementWrite = (e) => {this.setState({event_management: e.target.value})};
    pStarteWrite = (e) => {this.setState({event_period_start: e.target.value})};
    pEndWrite = (e) => {this.setState({event_period_end: e.target.value})};
    urlWrite = (e) => {this.setState({event_url: e.target.value})};
    handleFile = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                event_image_url : file,
                event_preview_url : reader.result
            })
        }
        reader.readAsDataURL(file);
    }
    contentWrite = (e) => {this.setState({event_content: e.target.value})};

    loadingData = async() => {
        try {
            const {id} = this.props.match.params;
            console.log(id)
            const response = await axios.get(`http://ec2-52-78-154-227.ap-northeast-2.compute.amazonaws.com/api/event/${id}`);
            this.setState({
                member: id,
                event_title: response.event_title,
                event_location: response.event_location,
                event_management: response.event_management,
                event_period_start: response.event_period_start,
                event_period_end: response.event_period_end,
                event_url: response.event_url,
                event_image_url: response.event_image_url,
                //event_preview_url: response.event_image_url,
                event_content: response.event_content,
            });
        } catch(e) {
            console.log(e);
        }
    };

    onClickSubmit = () => {
        if (this.state.notice_title !== "" && this.state.notice_content !== "") {
        axios.put(`http://ec2-52-78-154-227.ap-northeast-2.compute.amazonaws.com/api/event/${this.state.id}`, {
            member: localStorage.getItem('id'),
            event_title: this.state.event_title,
            event_location: this.state.event_location,
            event_management: this.state.event_management,
            event_period_start: this.state.event_period_start,
            event_period_end: this.state.event_period_end,
            event_url: this.state.event_url,
            event_image_url: this.state.event_image_url,
            //event_preview_url: this.state.event_image_url,
            event_content: this.state.event_content,
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
        let image_preview = null;
        if(this.state.event_image_url !== ''){
            image_preview = <img className='image_preview' src={this.state.event_preview_url} width="100px" height="100px" alt="no Imgage"></img>
        }
        return (
            <div>
                <Wrap>
                    <p>제목 : <input type ="text" name="title" onChange={this.titleWrite} defaultValue={this.state.event_title}/></p>
                    <p>장소 : <input type ="text" name="location" onChange={this.locationWrite} defaultValue={this.state.event_location}/></p>
                    <p>주최 : <input type ="text" name="management" onChange={this.managementWrite} defaultValue={this.state.event_management}/></p>
                    <p>시작 일시 : <input type ="date" name="pStart" onChange={this.pStarteWrite} defaultValue={this.state.event_period_start}/></p>
                    <p>종료 일시 : <input type="date" name="pEnd" onChange={this.pEndWrite} defaultValue={this.state.event_period_end}/></p>
                    <p>캠페인 주소 : <input type="text" name="url" onChange={this.urlWrite} defaultValue={this.state.event_url}/></p>
                    <p>캠페인 포스터 : <input type="file" name="imgaeUrl" accept="image/*" onChange={this.handleFile}/></p>
                    {image_preview}
                    <p>본문 : <textarea type="text" name="content" onChange={this.contentWrite} defaultValue={this.state.event_content}/></p>
                    <Button>
                        <Link to="/campaign" onClick={() => {this.onClickSubmit()}}>수정</Link>
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