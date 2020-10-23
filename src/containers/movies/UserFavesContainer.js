import React, { Component } from 'react';
import UserFavesMovieCard from '../../components/UserFavesMovieCard';

class UserFavesContainer extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="action-favorites-container">
                <h1>{this.props.currentUser.name}'s Favorites</h1>
                <div className="user-faves-card-row">
                    {this.props.movies.map(movie => <UserFavesMovieCard key={movie.movie_id} movie={movie} handleStateClick={this.props.handleStateClick} handleDelete={this.props.handleDelete}/>)}
                </div>
            </div>
         );
    }
}
 
export default UserFavesContainer;