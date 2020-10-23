import React, { PureComponent } from 'react';
import FavoriteMovieCard from '../../components/FavoriteMovieCard'

class AllMovieFavesContainer extends PureComponent {
    state = {  }
    render() { 
        return ( 
            <div className="action-favorites-container">
                <h2>{this.props.genre}</h2>
                <div className="action-card-row">
                    {this.props.movies.map((movie) => <FavoriteMovieCard key={movie.id} movie={movie} handleStateClick={this.props.handleStateClick} addToFaves={this.props.addToFaves}/>)}
                </div>
            </div>
         );
    }
}
 
export default AllMovieFavesContainer;