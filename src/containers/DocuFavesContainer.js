import React, { PureComponent } from 'react';
import FavoriteMovieCard from '../components/FavoriteMovieCard'

class DocuFavesContainer extends PureComponent {
    state = {  }
    render() { 
        return ( 
            <div className="action-favorites-container">
                <h2>Documentary</h2>
                <div className="action-card-row">
                    {this.props.docuMovies.map((docuMovie) => <FavoriteMovieCard key={docuMovie.id} movie={docuMovie} handleStateClick={this.props.handleStateClick}/>)}
                </div>
            </div>
         );
    }
}
 
export default DocuFavesContainer;