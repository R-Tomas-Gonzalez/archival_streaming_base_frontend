import React, { Component } from 'react';
import axios from 'axios';
import { HiOutlineLogout, HiOutlineUser } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import MoviePreviewContainer from '../containers/movies/MoviePreviewContainer';
import ActionFavesContainer from '../containers/movies/ActionFavesContainer';
import TrendingPreviewContainer from '../containers/movies/TrendingPreviewContainer';
import DocuFavesContainer from '../containers/movies/DocuFavesContainer';
import DramaFavesContainer from '../containers/movies/DramaFavesContainer';
import SciFiFavesContainer from '../containers/movies/SciFiFavesContainer.js';
import ThrillerFavesContainer from '../containers/movies/ThrillerFavesContainer';
import UserFavesContainer from '../containers/movies/UserFavesContainer'

const movieAPI = process.env.REACT_APP_MOVIE_KEY

class MoviesPage extends Component {
    state = { 
        moviePreview: {},
        trendingMovies: [],
        actionMovies: [],
        docuMovies: [],
        dramaMovies: [],
        scifiMovies: [],
        thrillerMovies: [],
        userFaves: [],
     }

    componentDidMount = () => {
        
        Promise.all([
            fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${movieAPI}`),
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${movieAPI}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28%2C%2028`),
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${movieAPI}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2020&with_genres=99`),
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${movieAPI}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2020&with_genres=10751`),
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${movieAPI}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=878`),
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${movieAPI}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=53`),
            
            ])
            .then(function (responses){
            return Promise.all(responses.map(function(response){
                return response.json();
            }));
            })
            .then(data => {
                const trendingMovieResults = data[0].results;
                const actionMovieResults = data[1].results;
                const docuMovieResults = data[2].results;
                const dramaMovieResults = data[3].results;
                const scifiMovieResults = data[4].results;
                const thrillerMovieResults = data[5].results;

                function grabMovieInfo(results){
                    const newResults = results.filter(result => result.poster_path != null)
                    return newResults
                }
            
                fetch("http://localhost:3001/movie_favorites")
                    .then(resp=>resp.json())
                    .then(movieFaves=>this.setUserFaves(movieFaves))

            this.setState({
                trendingMovies: grabMovieInfo(trendingMovieResults),
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
    }

    handleLogoutClick = () => {
        axios.delete("http://localhost:3001/logout", {withCredentials: true})
        .then(r => {this.props.handleLogout();})
        .catch(error => {
            console.log("logout error", error)
        })
    }

    addToFaves = (movie) => {

        // console.log(typeof(this.props.currentUser.id))
        console.log(movie)
        axios.post("http://localhost:3001/movie_favorites",{
            movie_id: movie.id,
            original_title: movie.original_title,
            overview: movie.overview,
            backdrop_path: movie.backdrop_path,
            poster_path: movie.poster_path,
            genre_ids: movie.genre_ids,
            release_date: movie.release_date,
            user_id: this.props.currentUser.id,
        },
        {withCredentials: true})
        .then(response => {if(this.props.currentUser.id === response.data.user_id){
            console.log(response.data)
                this.setState({userFaves: [...this.state.userFaves, response.data]})
            }})
    }

    setUserFaves = (movieFaves) => {
        const newMovieFaves = movieFaves.filter(movieFave => (movieFave.user_id === this.props.currentUser.id))
        this.setState({userFaves: newMovieFaves})
    }

    handleDelete = (movie) => {
        console.log(movie)

        fetch(`http://localhost:3001/movie_favorites/${movie.id}`, {
            method: 'DELETE',
            headers: {
              Accepts: 'application/json',
              'Content-type': 'application/json'
            }
            })
            .then(this.setState({ userFaves: this.state.userFaves.filter(movieFave => movieFave !== movie)}))

        
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
                    {Object.keys(this.state.moviePreview).length === 0 ? <MoviePreviewContainer movie={this.props.movies[0]} addToFaves={(movie) => this.addToFaves(movie)}/> : <MoviePreviewContainer movie={this.state.moviePreview} addToFaves={(movie) => this.addToFaves(movie)}/> }
                </div>
                <div className="user-favorites-container">
                    <UserFavesContainer currentUser={this.props.currentUser} movies={this.state.userFaves} handleStateClick={this.handleStateClick} handleDelete={this.handleDelete}/>
                </div>
                <hr></hr>
                <div className="user-faves-containers">
                    <TrendingPreviewContainer trendingMovies={this.state.trendingMovies} handleStateClick={this.handleStateClick} addToFaves={(movie) => this.addToFaves(movie)} genre={"trending"}/>
                    <ActionFavesContainer actionMovies={this.state.actionMovies} handleStateClick={this.handleStateClick} addToFaves={(movie) => this.addToFaves(movie)}/>
                    <DocuFavesContainer docuMovies={this.state.docuMovies} handleStateClick={this.handleStateClick} addToFaves={(movie) => this.addToFaves(movie)}/>
                    <DramaFavesContainer dramaMovies={this.state.dramaMovies} handleStateClick={this.handleStateClick} addToFaves={(movie) => this.addToFaves(movie)}/>
                    <SciFiFavesContainer scifiMovies={this.state.scifiMovies} handleStateClick={this.handleStateClick} addToFaves={(movie) => this.addToFaves(movie)}/>
                    <ThrillerFavesContainer thrillerMovies={this.state.thrillerMovies} handleStateClick={this.handleStateClick} addToFaves={(movie) => this.addToFaves(movie)}/>
                </div>
            </div>
         );
    }
}
 
export default MoviesPage;