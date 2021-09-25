import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';


class Read extends Component {
    constructor() {
        super();
        this.state ={
            id:'',
            board:[],
        };
    };
    
    loadingData = async() => {
        try {
            const {id} = this.props.match.params;
            console.log(id)
            const response = await axios.get(`http://ec2-52-78-154-227.ap-northeast-2.compute.amazonaws.com/api/notice/${id}`);
            this.setState({
                board:response.data,
            });
            console.log(response.data);
        } catch(e) {
            console.log(e);
        }
    };

    componentDidMount() { 
        const { loadingData } = this; 
        loadingData(); 
    }
    
    deleteRow(id, e){  
        axios.delete(`http://ec2-52-78-154-227.ap-northeast-2.compute.amazonaws.com/api/notice/${id}`)  
          .then(res => {  
            console.log(res);  
            console.log(res.data);  
          })  
        
      }  

    render() {
        const {board} = this.state;
        let content = this.state.board.notice_content; 
        const lineArr = []
        let line = ""
        for (let i = 0 ; i < content.length ; i++) {
            if (content[i] === '\n') {
                lineArr.push(line)
                line = ""
            } else {
                line = line.concat(content[i]);
            }
        }
        console.log(lineArr)

        const rendring = () => {
            const arr = [];
            for (let i = 0 ; i < lineArr.length; i++) {
                arr.push(<span key={i}>{lineArr[i]}<br/></span>)
            }
            return arr;
        }

        return (
            <Wrap>
                <h2>{board.notice_title}</h2>
                <h6 align="right">조회수 {board.notice_views}</h6>
                <h4>{board.member}</h4>
                <h5 align="right">{board.created_at} </h5>
                <h5 align="right"> {localStorage.getItem('id')} </h5>
                {rendring()}
                <Button>
                    <Link to="/notice">목록</Link>
                    <Link to="/notice" onClick={(e) => {this.deleteRow(board.id, e); alert("삭제되었습니다.");} }>삭제</Link>
                    <Link to={`/notice/modify/${board.id}`}>수정</Link>
                </Button>
            </Wrap>
        );
    }
}


const Wrap = styled.div`
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