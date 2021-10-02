import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 
import axios from 'axios'; 
import styled from 'styled-components';

class List extends Component { 
    
    state = { 
        events: [], 
        searchWord:'',
    }; 

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

    searchCampaign = (e) => {this.setState({searchWord: e.target.value})};

    onClickSubmit = async () => {
        if (this.state.searchWord !== "") {
        try { 
            const response = await axios.get("http://ec2-52-78-154-227.ap-northeast-2.compute.amazonaws.com/api/eventsearch", {
                params: {
                    search_key: this.state.searchWord
                }
            }); 
            this.setState({ events: response.data.event_list });
            console.log(this.state.events)
            } catch (e) { console.log(e); }
        }
    };

    componentDidMount() { 
        const { loadingData } = this; 
        loadingData(); 
    }

    render() { 
        const { events } = this.state; 
        var ddayList = [] 
        var i = 0
        const arr = this.state.events
        for(let i = 0; i < arr.length; i++) {
            const today = new Date();
            const dLL = arr[i]["event_period_end"].split('-');
            const dday = new Date(dLL[0], dLL[1]-1, dLL[2]);
            const gap =  (today.getTime() - dday.getTime())*(-1);
            const tmp = Math.ceil(gap/(1000*60*60*24))
            if (tmp > 0) {
                ddayList.push("D-" + String(tmp))
            }
            else if(tmp === 0) {
                ddayList.push("D-Day")
            }
            else{
                ddayList.push("마감")
            }
        }
        
        if (localStorage.getItem("auth") === "admin") {
            return (
                    <Wrap>
                        <div>
                        <h3><b>어떤 캠페인을 찾으시나요?{'\u00A0'}{'\u00A0'}{'\u00A0'}</b></h3>
                        <input type ="text" name="searchCampaign" onChange={this.searchCampaign} />
                        <button type ="button" name="searchButton" value="검색" onClick={() => {this.onClickSubmit()}}><img src='../../images/search.png' width='25px' height='25px' alt=""/></button>
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
                                            marginRight:'15px'
                                        }}></div>
                                        <div className='mid'>
                                            <h4 className= "campaign-title">{item.event_title}</h4>
                                            <p className= "campaign-date">내용 {item.event_content}</p>
                                            <p className= "campaign-date">주관 {item.event_management}</p>
                                        </div>
                                        <div className='right'>
                                            <p className= "campaign-dday">{ddayList[i++]}</p>
                                            <p className= "campaign-date">views :{item.event_views}</p>
                                        </div>
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
                    <h3><b>어떤 캠페인을 찾으시나요?{'\u00A0'}{'\u00A0'}{'\u00A0'}</b></h3>
                        <input type ="text" name="searchCampaign" onChange={this.searchCampaign} />
                        <button type ="button" name="searchButton" value="검색" onClick={() => {this.onClickSubmit()}}><img src='../../images/search.png' width='25px' height='25px' alt=""/></button>
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
                                            marginRight:'15px'
                                        }}></div>
                                        <div className='mid'>
                                            <h4 className= "campaign-title">{item.event_title}</h4>
                                            <p className= "campaign-date">내용 {item.event_content}</p>
                                            <p className= "campaign-date">주관 {item.event_management}</p>
                                        </div>
                                        <div className='right'>
                                            <p className= "campaign-dday" >{ddayList[i++]}</p>
                                            <p className= "campaign-date">views :{item.event_views}</p>
                                        </div>
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
    h3 {
        display:inline-block;
        float:left
    }
    
    .campaign-info {
        display:flex;
    }

    .mid {
        flex:4;
        margin-top:30px;
    }

    .right {
        flex:1;
        margin-top:70px;
        text-align:right;
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
        height:200px;
        background:rgb(250, 255, 250);
    }
    
    .campaign-title {
        overflow: hidden;
        text-overflow: clip;
        width:400px
        font-family: "Noto Sans KR", sans-serif;
    }
    
    .campaign-date {
        font-size: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 300px; 
        white-space:nowrap;
    }

    .campaign-dday {
        font-size: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 300px; 
        white-space:nowrap;
        color:rgb(68,145,44);
        font-weight:bold;
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