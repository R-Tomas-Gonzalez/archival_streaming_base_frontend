import React, { PureComponent } from 'react';
import MainPhotoCard from '../components/MainPhotoCard'

class MainPhotoContainer extends PureComponent {

    render() { 
        return ( 
            <div className="photo-container">
                <h2>New Images</h2>
                <div className="card-row">
                    {this.props.photos.map(photo => <MainPhotoCard key={photo.id} photo={photo}/>)}
                </div>
            </div>

         );
    }
}
 
export default MainPhotoContainer;