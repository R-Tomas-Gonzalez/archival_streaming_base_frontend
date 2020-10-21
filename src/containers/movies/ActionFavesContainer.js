import React, { PureComponent } from 'react';
import FavoriteMovieCard from '../../components/FavoriteMovieCard'

class ActionFavesContainer extends PureComponent {
    state = {  }
    render() { 
        return ( 
            <div className="action-favorites-container">
                <h2>Action</h2>
                <div className="action-card-row">
                    {this.props.actionMovies.map((actionMovie) => <FavoriteMovieCard key={actionMovie.id} movie={actionMovie} handleStateClick={this.props.handleStateClick} addToFaves={this.props.addToFaves}/>)}
                </div>
            </div>
         );
    }
}
 
export default ActionFavesContainer;