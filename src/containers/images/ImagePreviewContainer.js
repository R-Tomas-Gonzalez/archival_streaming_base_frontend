import React, { Component } from 'react';
import ImagePreviewComponent from '../../components/ImagePreviewComponent'

class ImagePreviewContainer extends Component {
    state = {  }
    render() {
        return ( 
            <div>
                <div className="image-preview-backdrop">
                {this.props.image !== undefined ? <ImagePreviewComponent image={this.props.image} addToFaves={this.props.addToFaves}/> : null}
                </div>
            </div>
         );
    }
}
 
export default ImagePreviewContainer;