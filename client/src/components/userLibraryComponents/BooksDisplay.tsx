import React from 'react';
import { Switch, Route } from 'react-router';
import { PageNotFound } from '../PageNotFound';
import AllBooks from './AllBooks';

const BooksDisplay: React.FC = () => {
  
    return (
        <div className='dashboard'>
            <h1>Your Library</h1>
            <hr/>
            <Switch>
                <Route exact path='/my-library/all-books' component={AllBooks}/>
                <Route path='/my-library/*' component={PageNotFound}/>
            </Switch>
        </div>
        
    );
};

export default BooksDisplay;