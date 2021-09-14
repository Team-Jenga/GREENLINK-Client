import React, { Component } from 'react';
import '../css/Header.css';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Header extends Component{
    render() {
        return(
            <header class='header'>
                <h1 class='logo'>
                    <img src='images/logo.png' alt='logo' title='logo'/>
                </h1>
                <div class='menubar'>
                    <Navbar bg="light" variant="light">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">About</Nav.Link>
                            <Nav.Link href="#features">이벤트 검색</Nav.Link>
                            <Nav.Link href="#pricing">공지사항</Nav.Link>
                        </Nav>
                    </Navbar>
                </div>
            </header>
        );
    }
}

export default Header;