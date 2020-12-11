import React, { PureComponent } from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import axios from 'axios';
import MainUserPage from './pages/MainUserPage';
import Modal from 'react-modal'
import RegistrationComponent from './auth/RegistrationComponent';
import GamesPage from './pages/GamesPage';
import MoviesPage from './pages/MoviesPage';
import ImagesPage from './pages/ImagesPage';

Modal.setAppElement('#root')

const pixAPI = process.env.REACT_APP_PIX_KEY
const movieAPI = process.env.REACT_APP_MOVIE_KEY

class App extends PureComponent {
  state = { 
    loggedInStatus: "NOT_LOGGED_IN",
    user: {},
    movies: [],
    games: [],
    photos: []
  }

  componentDidMount = () => {
    this.checkLoginStatus()

    Promise.all([
      fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${movieAPI}`),
      fetch("https://api.rawg.io/api/games?platforms=1,18&dates=2020-01-01,2020-11-01&ordering=rated"),
      fetch(`https://pixabay.com/api/?key=${pixAPI}&orientation=horizontal&image_type=photo`),
      // unsplash.photos.listPhotos( 1, 20)
      ])
      .then(function (responses){
      return Promise.all(responses.map(function(response){
          return response.json();
      }));
      })
      .then(data => {
        // console.log(data[2].hits)
      this.setState({
          movies: data[0].results,
          games: data[1].results,
          photos: data[2].hits
        })
      })
    }

  handleLogout = () => {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    })
  }
 
  checkLoginStatus() {

    axios.get("https://archival-streaming-base.herokuapp.com/logged_in", {withCredentials: true})
    // .then(resp => console.log(resp))
    .then(resp=>
      {if (resp.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN"){
      this.setState({
        loggedInStatus: "LOGGED_IN",
        user: resp.data.user
      })
    } else if (!resp.data.logged_in & this.state.loggedInStatus === "LOGGED_IN"){
      this.setState({
        loggedInStatus: "NOT_LOGGED_IN",
        user: {}
      })
    }
  })
    .catch(error => { console.log("check login error", error)})
  }

  handleLogin = (data) => {
      this.setState({
        loggedInStatus: "LOGGED_IN",
        user: data.user
      })
  }

  render() {
    
    return ( 
      <div className="App-background">
        <div className="App">
          {/* {console.log(this.state)} */}
          <BrowserRouter>
          <Switch>
            <Route 
            exact 
            path={"/"} 
            render={props=>(<LoginPage {...props} loggedInStatus={this.state.loggedInStatus} currentUser={this.state.user} handleLogin={this.handleLogin} handleLogout={this.handleLogout}/>
              )}
            />
            <Route 
            exact 
            path={"/registration"} 
            render={props=>(<RegistrationComponent {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus}/>
              )}
            />
            <Route 
            exact 
            path={"/main-page"} 
            render={props=>(<MainUserPage {...props} currentUser={this.state.user} handleLogout={this.handleLogout} 
              movies={this.state.movies} games={this.state.games} photos={this.state.photos}/>
              )}
            />
            <Route
            exact
            path={"/movies"}
            render={props=>(<MoviesPage {...props} currentUser={this.state.user} handleLogout={this.handleLogout} movies={this.state.movies}/>
            )}
            />
            <Route
            exact
            path={"/games"}
            render={props=>(<GamesPage {...props} currentUser={this.state.user} handleLogout={this.handleLogout} games={this.state.games} game={this.state.games[0]}/>
            )}
            />
            <Route
            exact
            path={"/images"}
            render={props=>(<ImagesPage {...props} currentUser={this.state.user} handleLogout={this.handleLogout} photos={this.state.photos}/>
            )}
            />
          </Switch>
          </BrowserRouter>
        </div>
      </div> 
  );
  }
}
 
export default App;