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
    const user = useSelector((state:RootState) => state.userInfo)
    
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

    const addBook = async() => {
        await axios.put('/updateLibrary', {
            params: {
                title: book.title,
                author: book.author,
                pages: book.pages,
                image: book.image,
                email: user.email
            }
        })
        .then( res => {
            console.log(res.data)

        }).catch(err => {
            console.log(`book add to library failed: ${err}`)
        })
    }

    return (
        <div className='details-container'>
            <div>
                <img src={book.image} alt='cover-art'/>
                <button className='btn btn-primary' onClick={addBook}style={{float: 'left', marginTop: '10px'}}>Add to library</button>
                <button className='btn btn-primary' style={{float: 'left', marginTop: '10px'}}>Add to read later</button>
            </div>
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