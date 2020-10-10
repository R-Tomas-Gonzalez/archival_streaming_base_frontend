import React, { Component } from 'react';
import RegistrationComponent from '../auth/RegistrationComponent'

class RegistrationPage extends Component {
    state = {  }

    handleSuccessfulAuth = (data) => {
        this.props.handleLogin(data);
        this.props.history.push("/")
    }

    render() {
        // console.log(this.props.userInfo)
        return (
            <div className="form-container">
                <RegistrationComponent handleSuccessfulAuth={this.handleSuccessfulAuth}/>
            </div>
         );
    }
}
 
export default RegistrationPage;