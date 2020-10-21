import React, { PureComponent } from 'react';
import MoviePreviewComponent from '../../components/MoviePreviewComponent';

class MoviePreviewContainer extends PureComponent {
    

    render() {
        // console.log(this.props)
        return ( 
            <div>
                <div className="movie-preview-backdrop">
                    {this.props.movie !== undefined ? <MoviePreviewComponent addToFaves={this.props.addToFaves} movie={this.props.movie}/> : null}
                </div>
            </div>
         );
    }
}
 
export default MoviePreviewContainer;