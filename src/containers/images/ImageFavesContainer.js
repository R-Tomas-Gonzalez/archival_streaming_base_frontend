import React, { Component } from 'react';
import UserFavesImageCard from '../../components/UserFavesImageCard'

class ImageFavesContainer extends Component {
    state = {  }
    render() { 
        
        return ( 
            <div className="action-favorites-container">
                <h1>{this.props.currentUser.name}'s Favorites</h1>
                <div className="user-faves-card-row">
                    {this.props.images.map((image) => <UserFavesImageCard key={image.id} image={image} handleStateClick={this.props.handleStateClick} handlePreviewClick={this.props.handlePreviewClick} addToFaves={this.props.addToFaves} handleDelete={this.props.handleDelete}/>)}
                </div>
            </div>
         );
    }
}
 
export default ImageFavesContainer;