import React, { Component } from 'react';
import Navbar from './Navbar/Navbar';
import '../css/Login.css';

class Login extends Component {
    render() {
        return(
            <div>
                <Navbar/>
                <div className="login-form">
                    <h3>Log in</h3>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" />
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                    <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p>
                </div>

                <div className="register-form">
                    <h3>Register</h3>

                    <div className="form-group">
                        <label>아이디</label>
                        <input type="text" className="form-control" placeholder="First name" />
                    </div>

                    <div className="form-group">
                        <label>비밀번호</label>
                        <input type="text" className="form-control" placeholder="Last name" />
                    </div>

                    <div className="form-group">
                        <label>이름</label>
                        <input type="text" className="form-control" placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label>닉네임</label>
                        <input type="text" className="form-control" placeholder="Enter password" />
                    </div>

                    <div className="form-group">
                        <label>생년월일</label>
                        <input type="date" className="form-control" placeholder="Enter password" />
                    </div>

                    <div className="form-group">
                        <label>전화번호</label>
                        <input type="text" className="form-control" placeholder="Enter password"/>
                    </div>

                    <div className="form-group">
                        <label>이메일</label>
                        <input type="email" className="form-control" placeholder="Enter password" />
                    </div>

                    <div className="form-group">
                        <label>거주 위치</label>
                        <input type="text" className="form-control" placeholder="Enter password" />
                    </div>

                    <div className="form-group">
                        <label>가구 수</label>
                        <input type="int" className="form-control" placeholder="Enter password" />
                    </div>

                    <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
                    <p className="forgot-password text-right">
                        Already registered <a href="#">log in?</a>
                    </p>
                </div>
            </div>
        );
    }
}

export default Login;