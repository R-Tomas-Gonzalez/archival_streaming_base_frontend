import React, { PureComponent } from 'react';
import MainMovieCard from '../components/MainMovieCard'


class MainMovieContainer extends PureComponent {

    render() { 
        return (
            <div className="movie-container">
                <h2>Trending Movies</h2>
                <div className="card-row">
                    {this.props.movies.map(movie => <MainMovieCard key={movie.id} movie={movie}/>)}
                </div>
            </div>

         );
    }
}
 
export default MainMovieContainer;