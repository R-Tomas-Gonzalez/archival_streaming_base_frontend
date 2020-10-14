import React, { PureComponent } from 'react';
import Unsplash from 'unsplash-js';
import { HiOutlineLogout, HiOutlineUser } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import MainMovieContainer from '../containers/MainMovieContainer';
import MainGameContainer from '../containers/MainGameContainer'
import MainPhotoContainer from '../containers/MainPhotoContainer';

const movieAPI = process.env.REACT_APP_MOVIE_KEY
const unsplashAPIKey = process.env.REACT_APP_UNSPLASH_KEY
const unsplashAPISecret = process.env.REACT_APP_UNSPLASH_SECRET

const unsplash = new Unsplash({
    accessKey: unsplashAPIKey,
    secret: unsplashAPISecret
})

class MainUserPage extends PureComponent {

    state = { 
        movies: [],
        games: [],
        photos: []
     }

    componentDidMount = () => {

        Promise.all([
            fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${movieAPI}`),
            fetch("https://api.rawg.io/api/games?platforms=1,18&dates=2020-01-01,2020-11-01&ordering=rated"),
            unsplash.photos.listPhotos( 1, 20,)
        ])
        .then(function (responses){
            return Promise.all(responses.map(function(response){
                return response.json();
            }));
        })
        .then(data => {
            this.setState({
                movies: data[0].results,
                games: data[1].results,
                photos: data[2]
            })
        })
    }

    handleLogoutClick = () => {
        axios.delete("http://localhost:3001/logout", {withCredentials: true})
        .then(r => {this.props.handleLogout();})
        .catch(error => {
            console.log("logout error", error)
        })
    }

    render() { 
        // console.log("Hello, I am on line 6 of MainUserPage", this.props)
        return (
            <div className="wrapper">
                <nav>
                    <ul className="main-nav">
                            <li>
                                <div className="home-icon-container">
                                    <div className="home-icon">
                                        <HiOutlineUser size="3.5em" />
                                    </div>
                                    <div>
                                       {this.props.currentUser.name}
                                    </div>
                                </div>    
                            </li>
                        <span className="middle-links">
                        <li><a href="#">Games</a></li>
                        <li><a href="#">Movies</a></li>
                        <li><a href="#">Images</a></li>
                        </span>
                            <NavLink to="/" onClick={() => this.handleLogoutClick()}>
                            <li>
                                <div className="logout-icon-container">
                                    <div>
                                        <HiOutlineLogout size="3.5em"/>
                                    </div>
                                    <div>
                                        LOGOUT
                                    </div>
                                </div>
                            </li>
                            </NavLink>
                    </ul>
                </nav>
                <div className="main-containers">
                    <MainMovieContainer movies={this.state.movies}/>
                    <MainGameContainer games={this.state.games}/>
                    <MainPhotoContainer photos={this.state.photos}/>
                </div>
            </div>
        );
    }
}
 
export default MainUserPage;