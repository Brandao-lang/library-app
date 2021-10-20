import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/login' component={Login}/>
        <Route path='/' component={Homepage}/>
      </Switch>
    </div>
  );
}

export default App;
