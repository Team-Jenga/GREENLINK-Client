import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Notice extends Component {
    render() {
        return(
            <div> 
                <div className="Notice"> 
                <ul> 
                    <li> <Link to="/notice/list">List</Link> </li> 
                    <li> <Link to="/notice/read">Read</Link> </li> 
                    <li> <Link to="/notice/write">Write</Link> </li> 
                </ul> 
                </div> 
            </div>
        );
    }
}
export default Notice;