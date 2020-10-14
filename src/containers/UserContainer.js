import React, { PureComponent } from 'react';
import UserBoxComponent from '../components/UserBoxComponent';

class UserContainer extends PureComponent {
    state = {  }
    
    render() { 
        const users = this.props.userInfo
        return (
            
            <div className="user-row">{users.map(user => <UserBoxComponent key={user.id} userInfo={user} handleSuccessfulAuth={this.props.handleSuccessfulAuth}/>)}</div>
           
        );
    }
}
 
export default UserContainer;