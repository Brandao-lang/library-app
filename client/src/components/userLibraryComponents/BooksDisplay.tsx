import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router';
import { RootState } from '../../redux/rootReducer';
import { PageNotFound } from '../PageNotFound';
import AllBooks from './AllBooks';
import CreateShelfModal from './modals/CreateShelfModal';

const BooksDisplay: React.FC = () => {
    const allShelves = useSelector((state: RootState) => state.userLibrary.userShelves)
    const dispatch = useDispatch()

    const displayShelf = (index: number) => {
        console.log(index)
        dispatch({type:'library/setShelf', payload: allShelves[index].shelf})
    }
    
    return (
        <>
            <ul className='library-sidebar'>
                <li>
                    <CreateShelfModal/>
                </li>
                <hr style={{marginTop: '0', marginBottom: '20px'}}/>
                {!allShelves ? 
                '' : 
                allShelves.map((shelf, index) => {
                    return <li onClick={() => displayShelf(index)}><button>{shelf.name}</button></li> 
                })
                }
            </ul>
            <div className='dashboard'>
                <h1>Your Library</h1>
                <hr style={{marginBottom: '5px'}}/>
                <Switch>
                    <Route exact path='/my-library/all-books' component={AllBooks}/>
                    <Route path='/my-library/*' component={PageNotFound}/>
                </Switch>
            </div>
        </>
    );
};

export default BooksDisplay;