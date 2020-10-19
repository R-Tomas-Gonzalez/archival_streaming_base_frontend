import React, { Component } from 'react';
import axios from 'axios';
import { HiOutlineLogout, HiOutlineUser } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import MoviePreviewContainer from '../containers/MoviePreviewContainer';
import ActionFavesContainer from '../containers/ActionFavesContainer';
import TrendingPreviewContainer from '../containers/TrendingPreviewContainer';
import DocuFavesContainer from '../containers/DocuFavesContainer';
import DramaFavesContainer from '../containers/DramaFavesContainer';
import SciFiFavesContainer from '../containers/SciFiFavesContainer.js';
import ThrillerFavesContainer from '../containers/ThrillerFavesContainer';

const movieAPI = process.env.REACT_APP_MOVIE_KEY

class MoviesPage extends Component {
    state = { 
        moviePreview: {},
        actionMovies: [],
        trendingMovies: [],
        docuMovies: [],
        dramaMovies: [],
        scifiMovies: [],
        thrillerMovies: []
     }

    componentDidMount = () => {
        Promise.all([
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${movieAPI}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28%2C%2028`),
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${movieAPI}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2020&with_genres=99`),
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${movieAPI}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2020&with_genres=10751`),
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${movieAPI}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=878`),
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${movieAPI}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=53`)
            ])
            .then(function (responses){
            return Promise.all(responses.map(function(response){
                return response.json();
            }));
            })
            .then(data => {

                const actionMovieResults = data[0].results;
                const docuMovieResults = data[1].results;
                const dramaMovieResults = data[2].results;
                const scifiMovieResults = data[3].results;
                const thrillerMovieResults = data[4].results;

                function grabMovieInfo(results){
                    const newResults = results.filter(result => result.poster_path != null)
                    return newResults
                }

            this.setState({
                actionMovies: grabMovieInfo(actionMovieResults),
                docuMovies: grabMovieInfo(docuMovieResults),
                dramaMovies: grabMovieInfo(dramaMovieResults),
                scifiMovies: grabMovieInfo(scifiMovieResults),
                thrillerMovies: grabMovieInfo(thrillerMovieResults),
                })
            }) 
        }

    handleStateClick = (movie) => {
        this.setState({moviePreview: movie})
        console.log(movie)
    }

    handleLogoutClick = () => {
        axios.delete("http://localhost:3001/logout", {withCredentials: true})
        .then(r => {this.props.handleLogout();})
        .catch(error => {
            console.log("logout error", error)
        })
    }

    // this function handles the state
    render() {
        return ( 
            <div className="wrapper">
                <nav>
                    <ul className="main-nav">
                        <li>
                            <NavLink className="mid-links"to="/main-page">
                                <div className="home-icon-container">
                                    <div className="home-icon">
                                        <HiOutlineUser size="3.5em" />
                                    </div>
                                    <div>
                                    {this.props.currentUser.name}
                                    </div>
                                </div>
                            </NavLink>   
                        </li>
                        <span className="middle-links">
                        <li><NavLink className="mid-links-movies" to="/movies">Movies</NavLink></li>
                        <li><NavLink className="mid-links-movies-games" to="/games">Games</NavLink></li>
                        <li><NavLink className="mid-links-movies-images" to="/images">Images</NavLink></li>
                        </span>
                        <NavLink className="mid-links" to="/" onClick={() => this.handleLogoutClick()}>
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
                <div>
                    {Object.keys(this.state.moviePreview).length === 0 ? <MoviePreviewContainer movie={this.props.movies[0]}/> : <MoviePreviewContainer movie={this.state.moviePreview}/> }
                </div>
                <div className="user-favorites">
                    <h1>User Favorites</h1>
                    <div className="user-favorites-container">

                    </div>
                </div>
                <hr></hr>
                <div className="user-faves-containers">
                    <TrendingPreviewContainer trendingMovies={this.props.movies} handleStateClick={this.handleStateClick}/>
                    <ActionFavesContainer actionMovies={this.state.actionMovies} handleStateClick={this.handleStateClick}/>
                    <DocuFavesContainer docuMovies={this.state.docuMovies} handleStateClick={this.handleStateClick}/>
                    <DramaFavesContainer dramaMovies={this.state.dramaMovies} handleStateClick={this.handleStateClick}/>
                    <SciFiFavesContainer scifiMovies={this.state.scifiMovies} handleStateClick={this.handleStateClick}/>
                    <ThrillerFavesContainer thrillerMovies={this.state.thrillerMovies} handleStateClick={this.handleStateClick}/>
                </div>
            </div>
         );
    }
}
 
export default MoviesPage;