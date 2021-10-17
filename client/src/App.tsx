import React from 'react';
import {Route, Switch} from 'react-router-dom'
import './App.css';
import BookPage from './components/BookPage';
import Homepage from './components/Homepage';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/' component={Homepage}/>
        <Route path='/details' component={BookPage}/>
      </Switch>
    </div>
  );
}

export default App;
