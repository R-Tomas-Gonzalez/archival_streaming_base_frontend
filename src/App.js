import React, { PureComponent } from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import axios from 'axios';
import MainUserPage from './pages/MainUserPage';
import Modal from 'react-modal'
import RegistrationComponent from './auth/RegistrationComponent';

Modal.setAppElement('#root')
class App extends PureComponent {
  state = { 
    loggedInStatus: "NOT_LOGGED_IN",
    user: {},
  }

  componentDidMount = () => {
    this.checkLoginStatus()
  }

  handleLogout = () => {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    })
  }
 
  checkLoginStatus() {
    axios.get("http://localhost:3001/logged_in", {withCredentials: true})
    .then(resp=>{ if (resp.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN"){
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
            render={props=>(<MainUserPage {...props} currentUser={this.state.user} handleLogout={this.handleLogout} movies={this.state.movies}/>
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