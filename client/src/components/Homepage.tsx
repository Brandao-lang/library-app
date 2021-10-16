import React, {useState} from 'react'
import BookSearch from './BookSearch'
import DisplayResults from './DisplayResults'

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

    const updateResults = (data: HomePageState['results']):void => {
        setResultsArr(data)
    }
    
    return (
        <div className='home-container'>
            <div className='login-signup-container'>
                <button className='signup'>Signup</button>
                <button className='login'>Login</button>
            </div>
            <BookSearch updateResults={updateResults}/>
            <DisplayResults resultsArr={resultsArr} />
        </div>
    )
}