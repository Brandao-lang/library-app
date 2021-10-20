import React, {useState} from 'react'
import BookSearch from './BookSearch'
import DisplayResults from './DisplayResults'
import {Switch, Route, Link } from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import BookPage from './BookPage'

export interface HomePageState {
    results: {
        bookTitle: string,
        author: string,
        description: string,
        pageCount: number,
        publisher: string,
        averageRating: number,
        imageLinks: string,
        publishedDate: string
    }[]  
}

export default function Homepage() {
    const [resultsArr, setResultsArr] = useState<HomePageState['results']>(JSON.parse(sessionStorage.getItem('searched')!) || [])
    
    const history = useHistory()
    
    const updateResults = (data: HomePageState['results']):void => {
        setResultsArr(data)
        sessionStorage.setItem('searched', JSON.stringify(data))
        history.push('/results')
    }

    return (
        <div className='home-container'>
            <div className='login-signup-container'>
                <Link to='/signup'>
                    <button className='/signup'>Signup</button>
                </Link>
                <Link to='/login'>
                <button className='login'>Login</button>
                </Link>
            </div>
            <BookSearch updateResults={updateResults}/>
            <Switch>
                <Route path='/results'>
                    <DisplayResults resultsArr={resultsArr} />
                </Route>
                <Route path='/details'>
                    <BookPage />
                </Route>
            </Switch>
        </div>
    )
}