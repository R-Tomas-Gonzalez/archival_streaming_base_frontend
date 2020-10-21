import React, { PureComponent } from 'react';
import FavoriteMovieCard from '../../components/FavoriteMovieCard'

class SciFiFavesContainer extends PureComponent {
    state = {  }
    render() { 
        return ( 
            <div className="action-favorites-container">
                <h2>Sci-Fi</h2>
                <div className="action-card-row">
                    {this.props.scifiMovies.map((scifiMovie) => <FavoriteMovieCard key={scifiMovie.id} movie={scifiMovie} handleStateClick={this.props.handleStateClick} addToFaves={this.props.addToFaves}/>)}
                </div>
            </div>
         );
    }
}
 
export default SciFiFavesContainer;