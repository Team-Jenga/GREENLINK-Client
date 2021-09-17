import React, { Component } from 'react'
import axios from 'axios'

class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          items: []
        };
      }
      
    componentDidMount() {
        axios.get(`http://ec2-52-78-154-227.ap-northeast-2.compute.amazonaws.com/api/member/`)
        .then(res => {
          const items = res.data;
          this.setState({ items });
        })
    }

    render() {
          return (
            <ul>
                { this.state.items.map(items => <li>{items.member_id} {items.member_pw} {items.member_name} {items.member_nickname}</li>)}
            </ul>
          );
        }
      }


export default PostList