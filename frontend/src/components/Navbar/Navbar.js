import React, { Component } from 'react';
import { MenuItems } from './MenuItems';
import { Button } from './Button';
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
                    <Link to="/"> <img className ='logo' src='images/logo2.png' alt='logo' title='logo'></img> </Link>
                </div>
                <div className='menu-icon' onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li>
                                <Link to={item.url} className={item.cName}>{item.title}</Link> 
                            </li>
                        )
                    })}
                </ul>
                <Link to="/login"><Button className='login'>로그인</Button></Link>
            </nav>
        )
    }
}

export default Navbar;