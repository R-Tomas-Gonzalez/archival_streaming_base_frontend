import React, { PureComponent } from 'react';
import FavoriteMovieCard from '../../components/FavoriteMovieCard'

class ThrillerFavesContainer extends PureComponent {
    state = {  }
    render() { 
        // console.log(this.props)
        return ( 
            <div className="action-favorites-container">
                <h2>Thriller</h2>
                <div className="action-card-row">
                    {this.props.thrillerMovies.map((thrillerMovie) => <FavoriteMovieCard key={thrillerMovie.id} movie={thrillerMovie} handleStateClick={this.props.handleStateClick} addToFaves={this.props.addToFaves}/>)}
                </div>
            </div>
         );
    }
}
 
export default ThrillerFavesContainer;