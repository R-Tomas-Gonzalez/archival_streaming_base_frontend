import React, { Component } from 'react';
import UserFavesGameCard from '../../components/UserFavesGameCard';

class GameFavesContainer extends Component {
    state = {  }
    render() { 
        
        return ( 
            <div className="action-favorites-container">
                <h1>{this.props.currentUser.name}'s Favorites</h1>
                <div className="user-faves-card-row">
                    {this.props.games.map(game => <UserFavesGameCard key={game.game_id} game={game} handlePreviewClick={this.props.handlePreviewClick} handleDelete={this.props.handleDelete}/>)}
                </div>
            </div>
         );
    }
}
 
export default GameFavesContainer;