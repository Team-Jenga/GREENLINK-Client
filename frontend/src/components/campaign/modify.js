import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';
import styled from 'styled-components';
import AWS from 'aws-sdk'

const S3_BUCKET = process.env.REACT_APP_BUCKET_NAME;
const REGION = process.env.REACT_APP_REGION;


AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

class Modify extends Component {
    constructor() {
        super();
        this.state ={
            member:'',
            event_id:'',
            event_title:'',
            event_location:'',
            event_management:'',
            event_period_start:'',
            event_period_end:'',
            event_url:'',
            event_image_url:'',
            event_preview_url:'',
            event_content:'',

            progress:'',
            selectedFile:''
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
        let name = encodeURI(file.name)
        this.setState({
            event_image_url : `https://s3-greenlink.s3.ap-northeast-2.amazonaws.com/${name}`,
            selectedFile : file
        })
        reader.onloadend = () => {
            this.setState({
                event_preview_url : reader.result
            })
        };
        console.log(this.state.event_image_url);
        console.log(this.state.event_preview_url);
        reader.readAsDataURL(file);
    }
    contentWrite = (e) => {this.setState({event_content: e.target.value})};

    uploadFile = (file) => {
        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };
        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                this.setState({progress :Math.round((evt.loaded / evt.total) * 100)})
            })
            .send((err) => {
                if (err) console.log(err)
            })
    }

    loadingData = async() => {
        try {
            const {id} = this.props.match.params; 
            console.log(id)
            const response = await axios.get(`http://ec2-52-78-154-227.ap-northeast-2.compute.amazonaws.com/api/event/${id}`);
            this.setState({
                member: response.data.member,
                event_id: id,
                event_title: response.data.event_title,
                event_location: response.data.event_location,
                event_management: response.data.event_management,
                event_period_start: response.data.event_period_start,
                event_period_end: response.data.event_period_end,
                event_url: response.data.event_url,
                event_image_url: response.data.event_image_url,
                //event_preview_url: response.event_image_url,
                event_content: response.data.event_content,
            });
        } catch(e) {
            console.log(e);
        }
    };

    onClickSubmit = () => {
        if (this.state.event_title !== "" && this.state.event_location !== "" && this.state.event_management !== "" &&this.state.event_period_start !== "" &&this.state.event_period_end !== "" &&this.state.event_url !== "" &&this.state.event_image_url !== "" &&this.state.event_content !== "") {
        axios.put(`http://ec2-52-78-154-227.ap-northeast-2.compute.amazonaws.com/api/event/${this.state.event_id}`, {
            member: this.state.member,
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
        }).then(alert('캠페인 수정 성공'));
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
            image_preview = <img className='image_preview' src={this.state.event_preview_url} width="300px" height="300px" alt="no Imgage"></img>
        }
        return (
            <div>
                <Wrap>
                    제목 : <input type ="text" name="title" onChange={this.titleWrite} defaultValue={this.state.event_title}/>
                    장소 : <input type ="text" name="location" onChange={this.locationWrite} defaultValue={this.state.event_location}/>
                    주최 : <input type ="text" name="management" onChange={this.managementWrite} defaultValue={this.state.event_management}/>
                    시작 일시 : <input type ="date" name="pStart" onChange={this.pStarteWrite} defaultValue={this.state.event_period_start}/>
                    종료 일시 : <input type="date" name="pEnd" onChange={this.pEndWrite} defaultValue={this.state.event_period_end}/>
                    캠페인 주소 : <input type="text" name="url" onChange={this.urlWrite} defaultValue={this.state.event_url}/>
                    캠페인 포스터 : <input type="file" name="imgaeUrl" accept="image/*" onChange={this.handleFile}/>
                    {image_preview}
                    본문 : <textarea type="text" name="content" onChange={this.contentWrite} defaultValue={this.state.event_content}/>
                    <Button>
                        <Link to="/campaign" onClick={() => {this.onClickSubmit(); this.uploadFile(this.state.selectedFile); }}>수정</Link>
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