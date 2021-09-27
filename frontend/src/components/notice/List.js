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
            this.setState({ boards: response.data, });
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
                        <h2>공지사항</h2>
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
                    <Button>
                        <Link to="/notice/write">글쓰기</Link>
                    </Button>
                    </Wrap>

                </div>
            );
        }
        else {
            return (
                <div>
                    <Wrap> 
                        <h2>공지사항</h2>
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