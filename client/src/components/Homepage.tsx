import React, {useState} from 'react'
import BookSearch from './BookSearch'
import DisplayResults from './DisplayResults'
import {Switch, Route} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import BookPage from './BookPage'
import SearchError from './SearchError'
import NavDropdown from './NavDropdown'

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
            <NavDropdown />
            <BookSearch updateResults={updateResults}/>
            <Switch>
                <Route exact path='/search/results'>
                    <DisplayResults resultsArr={resultsArr} />
                </Route>
                <Route exact path='/search/details'>
                    <BookPage updateResults={updateResults}/>
                </Route>
                <Route path ='/search/*' component={SearchError}/>
            </Switch>
        </div>
    )
}

export default Homepage