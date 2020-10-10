import React, { Component } from 'react';
import axios from 'axios'
import { HiOutlineUser } from 'react-icons/hi';



class UserBoxComponent extends Component {
    state = {}


    handleChange = (userInfo) => {

        console.log(userInfo)
        axios.post("http://localhost:3001/sessions", {
            user: {
                email: userInfo.email
            }
        },
        { withCredentials: true }
        )
        .then(response => { console.log(response.data)
            if (response.data.logged_in){
                this.props.handleSuccessfulAuth(response.data);
            }
        })
        .catch(error => {console.log("login error", error)})
    }

    render() {
        const userInfo = this.props.userInfo
        return ( 
        <div className="user-box-container" onClick={() => {this.handleChange(userInfo)}}>
            <div className="user-box">
                <div className="user-icon">
                <HiOutlineUser size="7em" />
                </div>
            </div>
            <div className="user-text">{userInfo.name.toUpperCase()}</div>
        </div> 
    );
    }
}
 
export default UserBoxComponent;