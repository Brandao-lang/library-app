import React, {useState} from 'react'
import BookSearch from './BookSearch'
import DisplayResults from './DisplayResults'
import {Switch, Route} from 'react-router-dom'
import {useHistory} from 'react-router-dom'

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
            <Switch>
                <Route path='/form'>
                    <BookSearch updateResults={updateResults}/>
                </Route>
                <Route path='/results'>
                    <DisplayResults resultsArr={resultsArr} />
                </Route>
            </Switch>
        </div>
    )
}