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
        author: Array<string>,
        description: string,
        pageCount: number,
        publisher: string,
        averageRating: number,
        imageLinks: string,
        publishedDate: string,
        id: number
    }[]  
}

const Homepage: React.FC = () => {
    const [resultsArr, setResultsArr] = useState<HomePageState['results']>(JSON.parse(sessionStorage.getItem('searched')!) || [])
    const [isLoading, setIsLoading] = useState(false)

    
    const history = useHistory()
    
    const updateResults = (data: HomePageState['results']):void => {
        setResultsArr(data)
        sessionStorage.setItem('searched', JSON.stringify(data))
        history.push('/search/results')
    }

    const sortResults = (sortBy: string) => {
        const resultsCopy = [...resultsArr]
        
        if(sortBy === 'rating') {
            const newArr = resultsCopy.sort(({averageRating:a}, {averageRating:b}) => b-a);
            console.log(newArr)
            setResultsArr(resultsCopy)
        } else if (sortBy === 'date') {
            resultsCopy.sort((a, b) => +new Date(b.publishedDate) - +new Date(a.publishedDate));
            setResultsArr(resultsCopy)
        }
    }

    return (
        <div className='home-container'>
            <NavDropdown />
            <BookSearch updateResults={updateResults} isLoading={isLoading} setIsLoading={setIsLoading}/>
            <Switch>
                <Route exact path='/search/results'>
                    <DisplayResults resultsArr={resultsArr} sortResults={sortResults} isLoading={isLoading}/>
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