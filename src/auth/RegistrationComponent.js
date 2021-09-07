import React, { Component} from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class RegistrationComponent extends Component {
    state = { 
        email: "",
        name: "",
        password: "",
        password_confirmation: "",
        registrationErrors: "", 
     }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        const {email, name, password, password_confirmation} = this.state;
        axios.post(/*"http://localhost:3001/registrations"*/ "https://archival-streaming-base.herokuapp.com/registrations", {
           user: {
               email: email,
               name: name,
               password: password,
               password_confirmation: password_confirmation
           } 
        },
        {withCredentials: true})
        .then(response=>{
            if (response.data.status === 'created')
        {this.props.handleSuccessfulAuth(response.data)}
        // else
        // {this.setState({
        //     registrationErrors: "Uhh ohh, something went wrong. Try again."
        // })}
        })
        .catch(error=>{console.log("reg error", error);})

        event.preventDefault();
    }

    render() { 
        return ( 
            <div className="registration-form">
                <form onSubmit={this.handleSubmit}>
                    <div className="register-welcome-message">Create an account</div>
                    <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required/>
                    <br></br>
                    <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} required/>
                    <br></br>
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
                    <br></br>
                    <input type="password" name="password_confirmation" placeholder="Password Confirmation" value={this.state.password_confirmation} onChange={this.handleChange} required/>
                    <br></br>
                    <button type="submit" className="auth-button"><strong>Register</strong></button>
                    <br></br>
                    <div className="go-home-link">Have an account? <NavLink to="/" className="link-styling" onClick={this.props.onClick}><strong>Log in.</strong></NavLink></div>
                </form>
                {/* <h2>{this.state.registrationErrors}</h2> */}
            </div>     
        );
    }
}
 
export default RegistrationComponent;
