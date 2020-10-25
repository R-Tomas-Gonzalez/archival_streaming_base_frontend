import React, { Fragment, PureComponent } from 'react';

import axios from 'axios';
import MainMovieContainer from '../containers/MainMovieContainer';
import MainGameContainer from '../containers/MainGameContainer'
import MainPhotoContainer from '../containers/MainPhotoContainer';
import NavBar from '../components/NavBar';

class MainUserPage extends PureComponent {

    state = {
     }

    handleLogoutClick = () => {
        axios.delete("https://archival-streaming-base.herokuapp.com/logout", {withCredentials: true})
        .then(r => {this.props.handleLogout();})
        .catch(error => {
            console.log("logout error", error)
        })
    }

    render() { 
        // console.log("Hello, I am on line 6 of MainUserPage", this.props)
        return (
            <Fragment>
                <div className="wrapper">
                    <NavBar currentUser={this.props.currentUser} handleLogoutClick={() => this.handleLogoutClick() } history={this.props.history}/>
                    <div className="main-containers">
                        <MainMovieContainer movies={this.props.movies}/>
                        <MainGameContainer games={this.props.games}/>
                        <MainPhotoContainer photos={this.props.photos}/>
                    </div>
                </div>
            </Fragment>
        );
    }
}
 
export default MainUserPage;