import React, { PureComponent } from 'react';
import axios from 'axios';
import { HiOutlineLogout, HiOutlineUser } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import GamePreviewContainer from '../containers/games/GamePreviewContainer';
import GameFavesContainer from '../containers/games/GameFavesContainer';
import AllGameFavesContainer from '../containers/games/AllGameFavesContainer'

const gameAPI = process.env.REACT_APP_GAME_KEY

class GamesPage extends PureComponent {
    state = { 
        gamePreview: {},
        trendingGames: [],
        actionGames: [],
        indieGames: [],
        shooterGames: [],
        fightingGames: [],
        rpgGames: [],
        userFaves: [],
    }

    componentDidMount = () => {
        Promise.all([
            fetch(`https://api.rawg.io/api/games?key=${gameAPI}&platforms=1,18&dates=2020-01-01,2020-11-01&ordering=rated`),
            fetch(`https://api.rawg.io/api/games?key=${gameAPI}&genres=4&dates=2019-01-01,2020-11-01`),
            fetch(`https://api.rawg.io/api/games?key=${gameAPI}&genres=51&dates=2019-01-01,2020-11-01`),
            fetch(`https://api.rawg.io/api/games?key=${gameAPI}&genres=2&dates=2019-01-01,2020-11-01`),
            fetch(`https://api.rawg.io/api/games?key=${gameAPI}&genres=6&dates=2019-01-01,2020-11-01`),
            fetch(`https://api.rawg.io/api/games?key=${gameAPI}&genres=5&dates=2019-01-01,2020-11-01`),
            fetch(`https://api.rawg.io/api/games/51325?key=${gameAPI}`),
        ])
        .then(function (response){
            return Promise.all(response.map(function (response){
                return response.json();
            }));
        })
        .then(data => {
            const trendingGameResults = data[0].results;
            const actionGameResults = data[1].results;
            const indieGameResults = data[2].results;
            const shooterGameResults = data[3].results;
            const fightingGameResults = data[4].results;
            const rpgGameResults = data[5].results;
            const gamePreviewResults = data[6];

            fetch("https://archival-streaming-base.herokuapp.com/game_favorites")
                .then(resp=>resp.json())
                .then(gameFaves=>this.setUserFaves(gameFaves))

            this.setState({
                trendingGames: trendingGameResults,
                actionGames: actionGameResults,
                indieGames: indieGameResults,
                shooterGames: shooterGameResults,
                fightingGames: fightingGameResults,
                rpgGames: rpgGameResults,
                gamePreview: gamePreviewResults
            })
        })
    }

    setUserFaves = (gameFaves) => {
        const newGameFaves = gameFaves.filter(gameFave => (gameFave.user_id === this.props.currentUser.id))
        this.setState({userFaves: newGameFaves})
    }
   
    handlePreviewClick = (game) => {
        const id = game.game_id ? parseInt(game.game_id) : game.id 
        
        fetch(`https://api.rawg.io/api/games/${id}?key=${gameAPI}`)
        .then(resp=>resp.json())
        .then(game => this.setState({gamePreview: game}))

        // this.setState({gamePreview: game})
    }

    addToFaves = (game) => {

        axios.post("https://archival-streaming-base.herokuapp.com/game_favorites", {
            game_id: game.id,
            name: game.name,
            background_image: game.background_image,
            user_id: this.props.currentUser.id,
        },
        {withCredentials: true})
        .then(response => {if(this.props.currentUser.id === response.data.user_id){
            this.setState({userFaves: [...this.state.userFaves, response.data]})
        }})
    }

    handleLogoutClick = () => {
        axios.delete("https://archival-streaming-base.herokuapp.com/logout", {withCredentials: true})
        .then(r => {this.props.handleLogout();})
        .catch(error => {
            console.log("logout error", error)
        })
    }

    handleDelete = (game) => {
        fetch(`https://archival-streaming-base.herokuapp.com/game_favorites/${game.id}`, {
            method: 'DELETE',
            headers: {
              Accepts: 'application/json',
              'Content-type': 'application/json'
            }
            })
            this.setState({ userFaves: this.state.userFaves.filter(gameFave => gameFave !== game)})
    }

    render() {
        
        return ( 
            <div className="wrapper">
                <nav>
                    <ul className="main-nav">
                        <li>
                            <NavLink className="mid-links"to="/main-page">
                                <div className="home-icon-container">
                                    <div className="home-icon">
                                        <HiOutlineUser size="3.5em" />
                                    </div>
                                    <div>
                                    {this.props.currentUser.name}
                                    </div>
                                </div>
                            </NavLink>   
                        </li>
                        <span className="middle-links">
                        <li><NavLink className="mid-links-games-movies" to="/movies">Movies</NavLink></li>
                        <li><NavLink className="mid-links-games" to="/games">Games</NavLink></li>
                        <li><NavLink className="mid-links-games-images" to="/images">Images</NavLink></li>
                        </span>
                        <NavLink className="mid-links" to="/" onClick={() => this.handleLogoutClick()}>
                            <li>
                                <div className="logout-icon-container">
                                    <div>
                                        <HiOutlineLogout size="3.5em"/>
                                    </div>
                                    <div>
                                        LOGOUT
                                    </div>
                                </div>
                            </li>
                        </NavLink>
                    </ul>
                </nav>
                <div >
                    {Object.keys(this.state.gamePreview).length === 0 ? <GamePreviewContainer game={this.props.games[1]} addToFaves={(game) => this.addToFaves(game)}/> : <GamePreviewContainer game={this.state.gamePreview} addToFaves={(game) => this.addToFaves(game)}/> }
                    <div className="user-favorites-container">
                        <GameFavesContainer currentUser={this.props.currentUser} games={this.state.userFaves} handlePreviewClick={this.handlePreviewClick} handleDelete={this.handleDelete}/>
                    </div>
                </div>
                <hr></hr>
                <div className="user-faves-containers">
                <AllGameFavesContainer games={this.state.trendingGames} handlePreviewClick={this.handlePreviewClick} addToFaves={(game) => this.addToFaves(game)} genre={"trending"}/>
                <AllGameFavesContainer games={this.state.actionGames} handlePreviewClick={this.handlePreviewClick} addToFaves={(game) => this.addToFaves(game)} genre={"action"}/>
                <AllGameFavesContainer games={this.state.indieGames} handlePreviewClick={this.handlePreviewClick} addToFaves={(game) => this.addToFaves(game)} genre={"indie"}/>
                <AllGameFavesContainer games={this.state.shooterGames} handlePreviewClick={this.handlePreviewClick} addToFaves={(game) => this.addToFaves(game)} genre={"shooter"}/>
                <AllGameFavesContainer games={this.state.fightingGames} handlePreviewClick={this.handlePreviewClick} addToFaves={(game) => this.addToFaves(game)} genre={"fighting"}/>
                <AllGameFavesContainer games={this.state.rpgGames} handlePreviewClick={this.handlePreviewClick} addToFaves={(game) => this.addToFaves(game)} genre={"RPG"}/>
                </div>
            </div>
         );
    }
}
 
export default GamesPage;