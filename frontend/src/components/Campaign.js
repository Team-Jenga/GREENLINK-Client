import React, { Component } from 'react';

import { parsingEvent } from '../crawling/Crawling'

class Campaign extends Component {
    render() {
        parsingEvent();
        return(
        <div>
            <h1>Campagin</h1>
        </div>
        );
    }
}

export default Campaign;