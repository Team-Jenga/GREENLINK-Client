import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 
import axios from 'axios'; 
import styled from 'styled-components';

class List extends Component { 
    state = { events: [], }; 

    loadingData = async () => { 
        try { 
            const response = await axios.get("http://ec2-52-78-154-227.ap-northeast-2.compute.amazonaws.com/api/event", {
                params: {
                    order_by:'hits'
                }
            }); 
            this.setState({ events: response.data.event_list });
            console.log(this.state.events)
        } catch (e) 
        { console.log(e); }
    };

    componentDidMount() { 
        const { loadingData } = this; 
        loadingData(); 
    }

    render() { 
        const { events } = this.state; 
        if (localStorage.getItem("auth") === "admin") {
            return (
                    <Wrap>
                        <div>
                        <h2><b>캠페인</b></h2>
                        <Button>
                            <Link to="/campaign/write">캠페인 쓰기</Link>
                        </Button>
                        </div>
                        <br/>
                        <br/>
                        {events.map((item)=> {
                            const image_url = item.event_image_url.replace("(", "%28").replace(")","%29");
                            return (
                                <ListItem className= "campaign-item" key = {item.event_id}>
                                <Link to={`/campaign/read/${item.event_id}`}>
                                    <div class='campaign-info'>
                                        <div style = {{ 
                                            backgroundImage: "url("+image_url+")",
                                            width:'100%',
                                            height:'260px',
                                            backgroundSize: 'cover', 
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                        }}></div>
                                        <h4 className= "campaign-title">{item.event_title}</h4>
                                        <p className= "campaign-date">{item.event_location}</p>
                                        <p className= "campaign-date">{item.event_reporting_date}</p>
                                    </div>
                                </Link>
                            </ListItem>
                            )
                        })}
                    </Wrap>
            );
        }
        else {
            return (
                <div>
                    <Wrap> 
                        <h2><b>캠페인</b></h2>
                        {events.map((item)=> {
                            return (
                                    <ListItem className= "campaign-item" key = {item.event_id}>
                                        <Link to={`/campaign/read/${item.event_id}`}>
                                            <div class='campaign-info'>
                                                <div style = {{ 
                                                    
                                                    backgroundImage: "url(${item.event_image_url})",
                                                    width:'100%',
                                                    height:'260px',
                                                    backgroundSize: 'cover', 
                                                    backgroundPosition: 'center',
                                                    backgroundRepeat: 'no-repeat',
                                                }}></div>
                                                <h4 className= "campaign-title">{item.event_title}</h4>
                                                <p className= "campaign-date">{item.event_location}</p>
                                                <p className= "campaign-date">{item.event_reporting_date}</p>
                                            </div>
                                        </Link>
                                    </ListItem>
                            )
                        })}
                    </Wrap>
                </div>
            );
        }
    }
}

const Wrap = styled.div`
    padding:20px;
    margin: 10px 230px 10px 230px;
    h2 {
        display:inline-block;
        float:left
    }
`;

const ListItem = styled.div`
    width:23%;
    margin-top:10px;
    padding:20px;
    float: left;
    border-top: 1px solid #eee;
    a{
        text-decoration:none;
    }
    h4{
        margin:0;
        padding: 0;
        overflow: hidden;
        color:#212121;
    }
    p {
        margin:0;
        padding:10px 0 0 0;
        color:#787878;
    }
    &:hover{
        h3{
            color:#0066ff;
        }
    }

    .campaign-item {
        width: 100%;
    }
    
    .campaign-info {
    padding: 10px;
    }
    
    .campaign-title {
    font-family: "Noto Sans KR", sans-serif;
    }
    
    .campaign-date {
    font-size: 12px;
    }
}
`;

const Button = styled.div`
    border-top: 1px solid #eee;
    a{
        float: right;
        padding: 10px 20px;
        border-radius: 5px;
        text-decoration:none;
        background:#212121;
        color:#fff;
    }
}`;

export default List;