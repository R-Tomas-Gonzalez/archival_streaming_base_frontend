import React, { PureComponent } from 'react';
import GamePreviewComponent from '../../components/GamePreviewComponent'

class GamePreviewContainer extends PureComponent {

    render() {
        return ( 
            <div>
                <div className="game-preview-backdrop">
                    {this.props.game !== undefined ? <GamePreviewComponent game={this.props.game} addToFaves={this.props.addToFaves}/> : null}
                </div>
            </div>
         );
    }
}
 
export default GamePreviewContainer;