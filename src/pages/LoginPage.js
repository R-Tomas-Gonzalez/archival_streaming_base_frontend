// Important functionality
import React, { Component, PureComponent } from 'react';
import {BrowserRouter, Switch, Route, NavLink} from "react-router-dom";
import axios from 'axios';
import { HiOutlineUserAdd } from 'react-icons/hi';

// Pages 
import Login from '../auth/Login';
import UserContainer from '../containers/UserContainer'


class Home extends PureComponent {
    state = { 
        users: []
     }

    componentDidMount = () => {
        this.fetchUsers()
    }

    fetchUsers = () => {
        fetch('http://localhost:3001/users')
        .then(resp=>resp.json())
        .then(users => {this.setState({users})
        })
    }

    handleLogoutClick = () => {
        axios.delete("http://localhost:3001/logout", {withCredentials: true})
        .then(r => {this.props.handleLogout();})
        .catch(error => {
            console.log("logout error", error)
        })
    }
    

    handleSuccessfulAuth = (data) => {
        this.props.handleLogin(data);
        this.props.history.push("/")
    }

    render() {
        return ( 
            <div>
                <h1>Home</h1>
                <h2>Status: {this.props.loggedInStatus} as {this.props.currentUser.name} </h2>
                <div className="login-container-1">
                    
                    <div className="login-container-2">
                        <NavLink to="/registration" className="link-styling">
                            <div className="registration-container">
                                <div className="registration-circle">
                                    <div className="registration-icon">
                                        <HiOutlineUserAdd size="7em" />
                                    </div>
                                </div>
                                <div className="new-user-text">NEW USER</div>
                            </div>
                        </NavLink>
                        {this.state.users.length ? <div className="login-container-3">
                            <UserContainer userInfo={this.state.users} handleSuccessfulAuth={this.handleSuccessfulAuth}/>
                        </div> : null }
                        
                        
                    </div>
                </div>
            </div>
            
         );
    }
}
 
export default Home;