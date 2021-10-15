import React from 'react'
import { HomePageState } from './Homepage'
import '../styles/displayresults.css'

interface DisplayResultsProps {
    resultsArr: HomePageState['results']
}

const DisplayResults: React.FC<DisplayResultsProps> = (props) => {
    return (
        <div>
            {props.resultsArr.map((result, index) => {
                return  <div key={index}>
                            <div className='row'>
                                <img src={result.imageLinks || 'N/A'} alt='cover-art' />
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