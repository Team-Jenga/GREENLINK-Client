import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';


class Read extends Component {
    constructor() {
        super();
        this.state ={
            id:'',
            event:[],
        };
    };
    
    loadingData = async() => {
        try {
            const {id} = this.props.match.params;
            console.log(id)
            const response = await axios.get(`http://ec2-52-78-154-227.ap-northeast-2.compute.amazonaws.com/api/event/${id}`);
            this.setState({
                event:response.data,
            });
            console.log(response);
        } catch(e) {
            console.log(e);
        }
    };

    componentDidMount() { 
        const { loadingData } = this; 
        loadingData(); 
    }
    
    deleteRow(eventId){  
        axios.delete(`http://ec2-52-78-154-227.ap-northeast-2.compute.amazonaws.com/api/event/${eventId}`)  
          .then(res => {  
            console.log(res);  
            console.log(res.data);  
        })      
    }  

    
    addFavorite = () => {
        console.log(this.state.event.member)
        console.log(this.state.event.event_id)
        axios.post(`http://ec2-52-78-154-227.ap-northeast-2.compute.amazonaws.com/api/favorite`, {
            member: this.state.event.member,
            event : this.state.event.event_id
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        }).then(alert('즐겨찾기 추가 성공'));
    }

    render() {
        const {event} = this.state;
        localStorage.setItem("event_content", event.event_content)
        let content = localStorage.getItem("event_content")
        localStorage.removeItem("event_content")

        if (localStorage.getItem("auth") === "admin" && localStorage.getItem("id") === event.member) {
            return (
                <div>
                    <Wrap>
                        <h2>{event.event_title}</h2>
                        <h5 align="right">{event.event_period_start} </h5>
                        <h5 align="right">{event.event_period_end} </h5>
                        <h6 align="right"> 작성자 : {event.member} </h6>
                        <p>
                            {
                                content.split("\n").map(line => {
                                    return (<span>{line}<br/></span>)
                                })
                            }
                        </p>
                        <img className="CampaignImg" alt="NoImage" src={event.event_image_url} width="1000px" height="500px"/>
                        <Button>
                            <Link to="/campaign">목록</Link>
                            <Link to="/campaign" onClick={(e) => {this.deleteRow(event.event_id); alert("삭제되었습니다.");} }>삭제</Link>
                            <Link to={`/campaign/modify/${event.event_id}`}>수정</Link>
                            <Link to={`/campaign`} onClick={this.addFavorite}>즐겨찾기</Link>
                        </Button>
                    </Wrap>

                </div>
            );
        }
        else {
            return (
                <div>
                    <Wrap>
                        <h2>{event.event_title}</h2>
                        <h5 align="right">{event.event_period_start} </h5>
                        <h5 align="right">{event.event_period_end} </h5>
                        <h6 align="right"> 작성자 : {event.member} </h6>
                        <p>
                            {
                                content.split("\n").map(line => {
                                    return (<span>{line}<br/></span>)
                                })
                            }
                        </p>
                        <img className="CampaignImg" alt="NoImage" src={event.event_image_url}  width="1000px" height="500px"/>
                        <Button>
                            <Link to="/campaign">목록</Link>
                        </Button>
                    </Wrap>

                </div>
            );
        }
    }
}


const Wrap = styled.div`
    margin: 10px 230px 10px 230px;
    padding:20px;
    h2 {
        padding-bottom:20px;
        border-bottom:1px solid #ccc;
    }
    p {
        min-height: 200px;
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