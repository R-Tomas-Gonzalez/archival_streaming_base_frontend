import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    state = { 
        email: "",
        password: "",
        loginErrors: "", 
     }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        axios.post("https://archival-streaming-base.herokuapp.com/sessions", {
           user: {
               email: this.state.email,
               password: this.state.password
           } 
        },
        {withCredentials: true})
        .then(response=>{
            if (response.data.logged_in)
        {this.props.handleSuccessfulAuth(response.data)}
        // else
        // {this.setState({
        //     registrationErrors: "Uhh ohh, something went wrong. Try again."
        // })}
        })
        .catch(error=>{console.log("login error", error);})

        console.log(this.state.email, this.state.password)
        event.preventDefault();
    }

    render() { 
        return ( 
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required/>
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
                    <button type="submit">Login</button>
                </form>
                {/* <h2>{this.state.registrationErrors}</h2> */}
            </div>
         );
    }
}
 
export default Login;