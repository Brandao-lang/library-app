import React, {useState} from 'react'
import BookSearch from './BookSearch'
import DisplayResults from './DisplayResults'
import {Switch, Route, Link } from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import BookPage from './BookPage'
import SearchError from './SearchError'

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

const Homepage: React.FC = () => {
    const [resultsArr, setResultsArr] = useState<HomePageState['results']>(JSON.parse(sessionStorage.getItem('searched')!) || [])
    
    const history = useHistory()
    
    const updateResults = (data: HomePageState['results']):void => {
        setResultsArr(data)
        sessionStorage.setItem('searched', JSON.stringify(data))
        history.push('/search/results')
    }

    return (
        <div className='home-container'>
            <div className='login-signup-container'>
                <Link to='/signup'>
                <button type="button" className="btn btn-secondary">Signup</button>
                </Link>
                <Link to='/login'>
                <button type="button" className="btn btn-secondary">Login</button>
                </Link>
            </div>
            <img style={resultsArr.length > 1 ? {position: 'absolute', left: 0, height:'120px'} : {}}src='https://www.logoground.com/uploads6/dv6y2018119692018-12-014371352owl%20and%20book.jpg' alt='owl-img'/>
            <BookSearch updateResults={updateResults}/>
            
            <Switch>
                <Route exact path='/search/results'>
                    <DisplayResults resultsArr={resultsArr} />
                </Route>
                <Route exact path='/search/details'>
                    <BookPage />
                </Route>
                <Route path ='/search/*' component={SearchError}/>
            </Switch>
        </div>
    )
}

export default Homepage