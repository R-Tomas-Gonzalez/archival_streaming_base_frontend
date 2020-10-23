import React, { PureComponent } from 'react';
import FavoriteGameCard from '../../components/FavoriteGameCard'

class AllGameFavesContainer extends PureComponent {
    state = {  }
    render() {
        return ( 
            <div className="action-favorites-container">
                <h2>{this.props.genre}</h2>
                <div className="action-card-row">
                    {this.props.games.map((game) => <FavoriteGameCard key={game.id} game={game} handlePreviewClick={this.props.handlePreviewClick} addToFaves={this.props.addToFaves}/>)}
                </div>
            </div>
         );
    }
}
 
export default AllGameFavesContainer;