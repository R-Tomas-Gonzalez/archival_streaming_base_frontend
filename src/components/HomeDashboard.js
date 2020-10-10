import React, { Component } from 'react';

class HomeDashboard extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <h1>Dashboard</h1>
                <h2>Status: {this.props.loggedInStatus}</h2>
            </div>
         );
    }
}
 
export default HomeDashboard;