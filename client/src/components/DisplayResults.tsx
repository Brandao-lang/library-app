import React from 'react'
import { HomePageState } from './Homepage'
import { useDispatch } from 'react-redux'
import '../styles/displayresults.css'
import { useHistory } from 'react-router-dom';

interface DisplayResultsProps {
    resultsArr: HomePageState['results']
}

const DisplayResults: React.FC<DisplayResultsProps> = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    
    const bookSelect = (bookData:any):void => {
        dispatch({type:'book/SelectedBook', payload: bookData})
        history.push('/details')
    }

    return (
        <div>
            <p>helo</p>
            {props.resultsArr.map((result, index) => {
                return  <div key={index}>
                            <div className='row'>
                                <img onClick={() => bookSelect(result)}src={result.imageLinks || 'N/A'} alt='cover-art' />
                                <h3>{result.bookTitle || 'N/A'}</h3>
                                <h3>{result.author || 'N/A'}</h3>
                                <h3>{result.averageRating || 'N/A'}</h3>
                                <h3>{result.publishedDate || 'N/A'}</h3>
                            </div>
                            <hr />
                        </div>
            })}
        </div>
    )
}

export default DisplayResults