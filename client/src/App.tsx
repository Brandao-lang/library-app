import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import Homepage from './components/Homepage';
import Login from './components/Login';
import { PageNotFound } from './components/PageNotFound';
import PrivateRoute from './components/PrivateRoute';
import Signup from './components/Signup';
import SignupSuccess from './components/SignupSuccess';
import UserLibrary from './components/UserLibrary';


const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' render={() => {
          return (
            <Redirect to='/search'/>
          )
        }}/>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/Login' component={Login}/>
        <Route exact path={'/success'} component={SignupSuccess}/>
        <PrivateRoute path='/my-library' component={UserLibrary}/>
        <Route path='/search' component={Homepage}/>
        <Route component={PageNotFound}/>
      </Switch>
    </div>
  );
}

export default App;
