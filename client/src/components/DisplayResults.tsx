import React from 'react'
import { HomePageState } from './Homepage'
import { useDispatch } from 'react-redux'
import '../styles/displayresults.css'
import { useHistory } from 'react-router-dom';
import { stars } from '../styles/assets/stars-rating'
import LoadingAnimation from './LoadingAnimation';

interface DisplayResultsProps {
    resultsArr: HomePageState['results'],
    sortResults: (sortBy: string) => void,
    isLoading: boolean
}

const DisplayResults: React.FC<DisplayResultsProps> = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    
    const bookSelect = (bookData:any):void => {
        dispatch({type:'book/SelectedBook', payload: bookData})
        history.push('/search/details')
    }

    return (
        <div className='results'>
            {/* <span>sort by: <button onClick={() => props.sortResults('rating')}>rating</button> | <button onClick={() => props.sortResults('date')}>date</button></span> */}
            {props.isLoading ? 
               <LoadingAnimation /> :
                props.resultsArr.length > 1 ? props.resultsArr.map((result, index) => {
                    return  <div key={index}>
                            <div className='row'>
                                <img onClick={() => bookSelect(result)}src={result.imageLinks || 'N/A'} alt='cover-art' />
                                <h5>{result.bookTitle || 'N/A'}</h5>
                                <h5>{!result.author ? 'N/A' : result.author.join(', ')}</h5>
                                <h5>{stars[result.averageRating] || 'N/A'}</h5>
                                <h5>{result.publishedDate || 'N/A'}</h5>
                            </div>
                            <hr className='divider'/>
                        </div>
            }) : <h1>Please make a search</h1>}
        </div>
    )
}

export default DisplayResults