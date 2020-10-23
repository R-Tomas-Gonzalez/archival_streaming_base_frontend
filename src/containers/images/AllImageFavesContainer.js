import React, { PureComponent } from 'react';
import FavoriteImageCard from '../../components/FavoriteImageCard'

class AllImageFavesContainer extends PureComponent {
    state = {  }
    render() {
        return ( 
            <div className="image-action-favorites-container">
                <h2>{this.props.genre}</h2>
                <div className="action-card-row">
                    {this.props.images.map((image) => <FavoriteImageCard key={image.id} image={image} handlePreviewClick={this.props.handlePreviewClick} addToFaves={this.props.addToFaves}/>)}
                </div>
            </div>
         );
    }
}
 
export default AllImageFavesContainer;