import React, { Component } from 'react';
import { MenuItems } from './MenuItems';
import { Button } from './MenuButton';
import '../../css/Navbar.css';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return(
            <nav className='NavbarItems'>
                <div className='NavbarLogo'>
                    <Link to="/"> <img className ='logo' src='images/logo.png' alt='logo' title='logo'></img> </Link>
                </div>
                <div className='menu-icon' onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'my-nav-menu active' : 'my-nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li>
                                <Link to={item.url} className={item.cName}>{item.title}</Link> 
                            </li>
                        )
                    })}
                </ul>
                <Link to="/login"><Button className='login'>로그인</Button></Link>
                <Link to="/register"><Button className='register'>회원가입</Button></Link>
            </nav>
        )
    }
}

export default Navbar;