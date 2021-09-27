import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 
import axios from 'axios'; 
import styled from 'styled-components';

class List extends Component { 
    state = { events: [], }; 

    loadingData = async () => { 
        try { 
            const response = await axios.get("http://ec2-52-78-154-227.ap-northeast-2.compute.amazonaws.com/api/event"); 
            console.log(`STATUS : ${response.status}`)
            this.setState({ events: response.data, });
            console.log(this.state)
        } catch (e) 
        { console.log(e); }
    };d

    componentDidMount() { 
        const { loadingData } = this; 
        loadingData(); 
    }

    render() { 
        const { events } = this.state; 

        if (localStorage.getItem("auth") === "admin") {
            return (
                <div>
                    <Wrap> 
                        <h2><b>캠페인</b></h2>
                        {events.map((item)=> {
                            return (
                                <ListItem key = {item.event_id}>
                                    <Link to={`/campaign/read/${item.event_id}`}>
                                        <h3>{item.event_title}</h3>
                                        <p>{item.event_location}</p>
                                        <p>{item.event_reporting_date}</p>
                                    </Link>
                                </ListItem>
                            )
                        })}
                        <Button>
                            <Link to="/campaign/write">캠페인 쓰기</Link>
                        </Button>
                    </Wrap>

                </div>
            );
        }
        else {
            return (
                <div>
                    <Wrap> 
                        <h2><b>캠페인</b></h2>
                        {events.map((item)=> {
                            return (
                                <ListItem key = {item.event_id}>
                                    <Link to={`/campaign/read/${item.event_id}`}>
                                        <h3>{item.event_title}</h3>
                                        <p>{item.event_location}</p>
                                        <p>{item.event_reporting_date}</p>
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
`;

const ListItem = styled.div`
    width:100%;
    margin-top:10px;
    padding:20px;
    border-top: 1px solid #eee;
    a{
        text-decoration:none;
    }
    h3{
        margin:0;
        padding: 0;
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
        background:#212121;
        color:#fff;
    }
}`;

export default List;