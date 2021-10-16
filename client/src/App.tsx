import React from 'react';
import {Route, Switch} from 'react-router-dom'
import './App.css';
import BookPage from './components/BookPage';
import Homepage from './components/Homepage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Homepage}/>
        <Route path='/info-page' component={BookPage}/>
      </Switch>
    </div>
  );
}

export default App;
