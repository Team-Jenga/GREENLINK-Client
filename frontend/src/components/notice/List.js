import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 
import axios from 'axios'; 
import styled from 'styled-components';

class List extends Component { 
    state = { boards: [], }; 

    loadingData = async () => { 
        try { 
            const response = await axios.get("http://ec2-52-78-154-227.ap-northeast-2.compute.amazonaws.com/api/notice"); 
            console.log(`STATUS : ${response.status}`)
            this.setState({ boards: response.data.data, });
            console.log(this.state)
        } catch (e) 
        { console.log(e); }
    };d

    componentDidMount() { 
        const { loadingData } = this; 
        loadingData(); 
    }

    render() { 
        const { boards } = this.state; 

        if (localStorage.getItem("auth") === "admin") {
            return (
                <div>
                    <Wrap> 
                        <div>
                            <h2><b>공지사항</b></h2>
                            <Button>
                                <Link to="/notice/write">글쓰기</Link>
                            </Button>
                        </div>
                        <br/>
                        <br/>
                        {boards.map((item)=> {
                            return (
                                <ListItem key = {item.id}>
                                    <Link to={`/notice/read/${item.id}`}>
                                        <h3>{item.notice_title}</h3>
                                        <p>{item.notice_content}</p>
                                    </Link>
                                </ListItem>
                            )
                        })}
                    </Wrap>

                </div>
            );
        }
        else {
            return (
                <div>
                    <Wrap> 
                        <h2><b>공지사항</b></h2>
                        {boards.map((item)=> {
                            return (
                                <ListItem key = {item.id}>
                                    <Link to={`/notice/read/${item.id}`}>
                                        <h3>{item.notice_title}</h3>
                                        <p>{item.notice_content}</p>
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