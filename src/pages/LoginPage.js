// Important functionality
import React, { Fragment, PureComponent } from 'react';
import { HiOutlineUserAdd } from 'react-icons/hi';
import RegistrationModal from '../components/RegistrationModal'
import RegistrationComponent from '../auth/RegistrationComponent'
import {PulseLoader} from 'react-spinners'

// Pages 
import UserContainer from '../containers/UserContainer'

class Home extends PureComponent {
    state = { 
        users: [],
        isOpen: false,
     }

    componentDidMount = () => {
        this.fetchUsers()
    }

    fetchUsers = () => {
        fetch('https://archival-streaming-base.herokuapp.com/users')
        .then(resp=>resp.json())
        .then(users => {this.setState({users})
        })
    }
    
    handleSuccessfulAuth = (data) => {
        this.props.handleLogin(data);
        this.props.history.push("/main-page")
    }

    render() {
        return ( 
            <Fragment>
                <div className="login-container-1">
                    <div className="site-title">
                        <h1>Archival Streaming Base</h1>
                    </div>
                    <div className="login-container-2">
                        <div className="registration-container" onClick={() => this.setState({isOpen: true })}>
                            <div className="registration-circle">
                                <div className="registration-icon">
                                    <HiOutlineUserAdd size="7em" />
                                </div>
                            </div>
                            <div className="new-user-text">NEW USER</div>
                        </div>
                    <RegistrationModal open={this.state.isOpen} onClose={() => this.setState({isOpen: false})}>
                        <RegistrationComponent to="/" onClick={() => this.setState({isOpen: false})} handleSuccessfulAuth={this.handleSuccessfulAuth}/>
                    </RegistrationModal>
                        {this.state.users.length ? 
                        <Fragment>
                            <div className="login-container-3">
                                <UserContainer userInfo={this.state.users} handleSuccessfulAuth={this.handleSuccessfulAuth} />
                            </div> 
                        </Fragment>
                        : 
                        <div className="login-container-3">
                            <div className="user-row">
                                <PulseLoader loading size={30} color="white"/>
                            </div> 
                        </div>}
                    </div>
                </div>
            </Fragment>
         );
    }
}
 
export default Home;