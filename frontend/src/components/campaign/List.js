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
                                            height:'170px',
                                            width:'15%',
                                            backgroundSize: 'cover', 
                                            backgroundPosition: 'center', 
                                            backgroundRepeat: 'no-repeat',
                                            float:'left',
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
                            const image_url = item.event_image_url.replace("(", "%28").replace(")","%29");
                            return (
                                    <ListItem className= "campaign-item" key = {item.event_id}>
                                        <Link to={`/campaign/read/${item.event_id}`}>
                                            <div class='campaign-info'>
                                                <div style = {{ 
                                                    backgroundImage: "url("+image_url+")",
                                                    height:'170px',
                                                    width:'15%',
                                                    backgroundSize: 'cover', 
                                                    backgroundPosition: 'center', 
                                                    backgroundRepeat: 'no-repeat',
                                                    float:'left',
                                                }}>
                                                </div>
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
    width:100%;
    margin-top:50px;
    padding:20px;
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
        width:100%;
        height:180px;
        background:rgb(247, 255, 245);
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
    a{
        text-decoration:none;
        color: white;
    }
    float: right;
    appearance: none;
    background-color: #2ea44f;
    border: 1px solid rgba(27, 31, 35, .15);
    border-radius: 6px;
    box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    padding: 6px 16px;
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
    white-space: nowrap;
  
   &:focus:not(:focus-visible):not(.focus-visible) {
    box-shadow: none;
    outline: none;
  }
  
  &:hover {
    background-color: #2c974b;
  }
  
  &:focus {
    box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
    outline: none;
  }
  
  &:disabled {
    background-color: #94d3a2;
    border-color: rgba(27, 31, 35, .1);
    color: rgba(255, 255, 255, .8);
    cursor: default;
  }
  
  &:active {
    background-color: #298e46;
    box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
  }
}`;

export default List;