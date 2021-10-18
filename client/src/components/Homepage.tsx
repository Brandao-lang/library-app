import React, {useState} from 'react'
import BookSearch from './BookSearch'
import DisplayResults from './DisplayResults'
import {Switch, Route} from 'react-router-dom'
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
    const [resultsArr, setResultsArr] = useState<HomePageState['results']>([])
    
    const history = useHistory()
    
    const updateResults = (data: HomePageState['results']):void => {
        setResultsArr(data)
        history.push('/results')
    }
    
    return (
        <div className='home-container'>
            <div className='login-signup-container'>
                <button className='signup'>Signup</button>
                <button className='login'>Login</button>
            </div>
            <BookSearch updateResults={updateResults}/>
            <Switch>
                <Route exact path='/results'>
                    <DisplayResults resultsArr={resultsArr} />
                </Route>
                <Route exact path='/details'>
                    <BookPage />
                </Route>
            </Switch>
        </div>
    )
}