import React, { Component } from 'react';
import '../../css/Navbar.css';

import { MenuItems } from './MenuItems';
import { MenuItems2 } from './MenuItems';
import { Button } from './MenuButton';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    state = { clicked: false };

    checkLogin() {
        if (localStorage.getItem('id') != null) {
            return true;
        } else {return false;}
    }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked });
    }

    onClickLogout = () => {
        localStorage.clear();
        window.location.reload();
    }

    render() {
        const isLoggedIn = this.checkLogin();
        console.log(isLoggedIn);
        
        let button = null;
        if (isLoggedIn) {
            button = <Link to="/"><Button className="logout" onClick={this.onClickLogout}>로그아웃</Button></Link>;
        } else {
            button = <Link to="/login"><Button className="login">로그인</Button></Link>;
        }

        return(
            <nav className='NavbarItems'>
                <div className='NavbarLogo'>
                    <Link to="/"> <img className ='logo' src='../../images/logo.png' alt='logo' title='logo'></img> </Link>
                </div>
                <div className='menu-icon' onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'my-nav-menu active' : 'my-nav-menu'}>
                    {isLoggedIn && 
                    MenuItems2.map((item) => {
                        return (
                            <li key = {item.id}>
                                <Link to={item.url} className={item.cName} onClick={item.title === "로그아웃" ? this.onClickLogout : undefined } >{item.title}</Link> 
                            </li>
                        )
                    })}
                    {!isLoggedIn && 
                    MenuItems.map((item) => {
                        return (
                            <li key = {item.id}>
                                <Link to={item.url} className={item.cName}>{item.title}</Link>
                            </li>
                        )
                    })}
                </ul>
                {button}
            </nav>
        )
    }
}

export default Navbar;