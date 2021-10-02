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
            favoriteFlag:0,
        };
    };
    
    loadingData = async() => {
        try {
            const {id} = this.props.match.params;
            console.log(id)
            const response = await axios.get(`http://ec2-52-78-154-227.ap-northeast-2.compute.amazonaws.com/api/event/${id}`);
            this.setState({
                event:response.data
            });
            console.log(response.event_id);
        } catch(e) {
            console.log(e);
        }
    };

    favoriteCheck = async() => {
        try {
            const {id} = this.props.match.params;
            const favoriteRes = await axios.get(`http://ec2-52-78-154-227.ap-northeast-2.compute.amazonaws.com/api/favorites`, {
                params: {
                    member: localStorage.getItem('id'),
                }
            });

            const arr = favoriteRes.data.event_list
            for(let i = 0; i < arr.length; i++) {
                if (arr[i]["event_id"] === parseInt(id)) {
                    this.setState({
                        favoriteFlag:1
                    })
                    break
                }
                else {
                    this.setState({
                        favoriteFlag:0
                    })
                }
            }
            console.log(this.state.favoriteFlag)
        } catch(e) {
            console.log(e);
        }
    }

    componentDidMount() { 
        const { loadingData, favoriteCheck } = this; 
        loadingData(); 
        favoriteCheck();
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
        axios.post(`http://ec2-52-78-154-227.ap-northeast-2.compute.amazonaws.com/api/favorites`, {
            member: localStorage.getItem('id'),
            event : this.state.event.event_id
        }).then(function (response) {
            alert('즐겨찾기 추가 성공')
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        })
    }

    deleteFavorite = () => {
        const id = localStorage.getItem('id');
        const ev = this.state.event.event_id;
        console.log(`http://ec2-52-78-154-227.ap-northeast-2.compute.amazonaws.com/api/favorites/${id}/${ev}`)
        axios.delete(`http://ec2-52-78-154-227.ap-northeast-2.compute.amazonaws.com/api/favorites/${id}/${ev}`, {
        }).then(function (response) {
            alert('즐겨찾기 제거 성공')
            console.log(response);
        }).catch(function (error) {
            console.log(error.response);

        })
    }

    render() {
        const {event} = this.state;
        localStorage.setItem("event_content", event.event_content)
        let content = localStorage.getItem("event_content")
        localStorage.removeItem("event_content")

        let favoriteButton = null;
        if(this.state.favoriteFlag === 0) {
            favoriteButton = <Link to={`/campaign`} onClick={this.addFavorite}>즐겨찾기 추가</Link>
        } else {
            favoriteButton = <Link to={`/campaign`} onClick={this.deleteFavorite}>즐겨찾기 제거</Link>
        }

        if (localStorage.getItem("auth") === "admin" && localStorage.getItem("id") === event.member) {
            return (
                <div display="flex">
                    <Wrap>
                        <h2>{event.event_title}</h2>
                        <img className="CampaignImg" alt="NoImage" src={event.event_image_url} width="400px" height="400px" />
                        <div className="contentDiv">
                            <div className="CampaignText">
                                <h5 align="right"> 시작일 : {event.event_period_start} </h5>
                                <h5 align="right"> 마감일 : {event.event_period_end} </h5>
                                <h6 align="right"> 작성자 : {event.member} </h6>
                            </div>
                            <p><b>주관 : </b>{event.event_management}</p>
                            <p><b>주최 장소 : </b>{event.event_location}</p>
                            <p><b> 내용 : </b><br/>
                                {
                                    content.split("\n").map(line => {
                                        return (<span>{line}<br/></span>)
                                    })
                                }
                            </p>
                            <p><b></b><a href={event.event_url}>지금 참여하기 !</a></p>
                        </div>
                        <Button>
                            <Link to="/campaign">목록</Link>
                            <Link to="/campaign" onClick={(e) => {this.deleteRow(event.event_id); alert("삭제되었습니다.");} }>삭제</Link>
                            <Link to={`/campaign/modify/${event.event_id}`}>수정</Link>
                            {favoriteButton}
                        </Button>
                    </Wrap>

                </div>
            );
        }
        else {
            return (
                <div display="flex">
                    <Wrap>
                        <h2>{event.event_title}</h2>
                        <img className="CampaignImg" alt="NoImage" src={event.event_image_url} width="400px" height="400px" />
                        <div className="contentDiv">
                            <div className="CampaignText">
                                <h5 align="right"> 시작일 : {event.event_period_start} </h5>
                                <h5 align="right"> 마감일 : {event.event_period_end} </h5>
                                <h6 align="right"> 작성자 : {event.member} </h6>
                            </div>
                            <p><b>주관 : </b>{event.event_management}</p>
                            <p><b>주최 장소 : </b>{event.event_location}</p>
                            <p><b> 내용 : </b><br/>
                                {
                                    content.split("\n").map(line => {
                                        return (<span>{line}<br/></span>)
                                    })
                                }
                            </p>
                            <p><b></b><a href={event.event_url}>지금 참여하기 !</a></p>
                        </div>
                        <Button>
                            {favoriteButton}
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

    .CampaignImg {
        float:left;
        margin-right:20px;
        margin-top: 20px;
    }

    .contentDiv {
        overflow-x:hidden;
        overflow-y:hidden;
        margin-top: 20px;
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