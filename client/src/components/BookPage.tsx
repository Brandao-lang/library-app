import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/rootReducer'
import '../styles/bookPage.css'
import { AxiosShape } from './BookSearch'
import { HomePageState } from './Homepage'
import { stars } from '../styles/assets/stars-rating'

interface BookPageProps {
    updateResults(data: HomePageState['results']):void
}

const BookPage: React.FC<BookPageProps> = (props) => {
    const book = useSelector((state:RootState) => state.bookInfo)

    const searchAuthor = async() => {
        await axios.get<AxiosShape['data']>('/fetchResults', {
            params: {
                title: '',
                author: book.author
            }
        }).then( res => {
            props.updateResults(res.data)
            }
        ).catch(err => {
            console.log(`Author search failed: ${err}`)
        })
    }

    return (
        <div className='details-container'>
            <img src={book.image} alt='cover-art'/>
            <div className='info'>
                <h1><u>{book.title}</u></h1>
                <h4 className='display-6' onClick={searchAuthor}>{book.author || 'N/A'}</h4>
                <br/>
                <h5>Publisher: {book.publisher || 'N/A'}</h5>
                <h5>Published: {book.publishedDate || 'N/A'}</h5>
                <h5>Rating: {book.rating} {stars[book.rating] || 'N/A'}</h5>
                <h5>Page Count: {book.pages || 'N/A'}</h5>
                <br/>
                <h5>Description:</h5>
                <p>{book.description}</p>
            </div>
        </div>
    )
}

export default BookPage