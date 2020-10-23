import React, { PureComponent } from 'react';
import FavoriteMovieCard from '../../components/FavoriteMovieCard'

class DramaFavesContainer extends PureComponent {
    state = {  }
    render() { 
        return ( 
            <div className="action-favorites-container">
                <h2>Drama & Family</h2>
                <div className="action-card-row">
                    {this.props.dramaMovies.map((dramaMovie) => <FavoriteMovieCard key={dramaMovie.id} movie={dramaMovie} handleStateClick={this.props.handleStateClick} addToFaves={this.props.addToFaves}/>)}
                </div>
            </div>
         );
    }
}
 
export default DramaFavesContainer;