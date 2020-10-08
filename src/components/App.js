import React from 'react';
import '../App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from './Home';


function App() {
  return (
    <div className="App">
      <div className="App-background">
        <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={Home}/>
        </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
