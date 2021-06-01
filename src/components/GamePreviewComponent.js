import React, { PureComponent } from 'react';
import { FaRegHeart } from "react-icons/fa";

    

class GamePreviewComponent extends PureComponent {
    

    render () {
        // console.log(this.props.game)
        const allClips = this.props.game.clip
        const clip = allClips ? allClips.clip : null
        const title = this.props.game.name
        const backdropImg = this.props.game.background_image
        const description = this.props.game.description_raw ? this.props.game.description_raw.split(/(?<=[.!])/g)[0] + this.props.game.description_raw.split(/(?<=[.!])/g)[1]: null
        const release_date = this.props.game.released ? this.props.game.released.split("-")[0] : null

        return ( 
            <div className="preview-header">
            <div className="preview-background">
                <div className="empty-div"></div>
                <img className="preview-image" srcSet={`${backdropImg} 4x`} alt="preview"/>
                <div className="poster-overlay"/>
            </div>
            <div className="game-preview-details" id="details">
                <div className="preview-card">
                    {clip ? <iframe className="preview-card-video" src={clip} allowFullScreen ></iframe> : null}
                </div>
                <div className="title-release">
                    <div className="title"><strong>{title}</strong><span>({release_date})</span></div>
                    <button className="add-faves-btn-preview" data-text="add to faves" onClick={(e) => {e.stopPropagation(); this.props.addToFaves(this.props.game)}}><FaRegHeart size="1.5em"/></button>
                    <h2>Overview</h2>
                    <div className="overview">{description}</div>
                </div>
            </div>
        </div>
         );
    }
    
}
 
export default GamePreviewComponent;