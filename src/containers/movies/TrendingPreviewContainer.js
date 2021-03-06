import React, { PureComponent } from 'react';
import FavoriteMovieCard from '../../components/FavoriteMovieCard'

class TrendingPreviewContainer extends PureComponent {
    state = {  }
    render() {
        return ( 
            <div className="action-favorites-container">
                <h2>Trending</h2>
                <div className="action-card-row">
                    {this.props.trendingMovies.map((trendingMovie) => <FavoriteMovieCard key={trendingMovie.id} movie={trendingMovie} handleStateClick={this.props.handleStateClick} addToFaves={this.props.addToFaves}/>)}
                </div>
            </div>
         );
    }
}
 
export default TrendingPreviewContainer;