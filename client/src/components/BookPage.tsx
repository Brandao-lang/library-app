import React, { useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/rootReducer'
import '../styles/bookPage.css'
import { AxiosShape } from './BookSearch'
import { HomePageState } from './Homepage'
import { Button } from 'react-bootstrap'
import { stars } from '../styles/assets/stars-rating'

interface BookPageProps {
    updateResults(data: HomePageState['results']):void
}

const BookPage: React.FC<BookPageProps> = (props) => {
    const [hasClicked, setHasClicked] = useState(false)
    const book = useSelector((state:RootState) => state.bookInfo)
    const user = useSelector((state:RootState) => state.userInfo)
    const dispatch = useDispatch()
    
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
        setHasClicked(true)
        const selectedBook = {
            title: book.title,
            author: book.author,
            pages: book.pages,
            image: book.image,
            id: user.id
        }

        await axios.put('/updateLibrary', selectedBook)
        .then( res => {
            dispatch({type:'library/AddBook', payload: selectedBook})

        }).catch(err => {
            console.log(`book add to library failed: ${err}`)
        })
    }

    return (
        <div className='details-container'>
            <div className='test'>
                <img src={book.image} alt='cover-art'/>
                <br/>
                <Button
                    className='add-btn' 
                    variant= {
                        hasClicked ?
                        'success' :
                        'primary'
                    }
                    onClick={addBook}
                    style={
                            {
                                float: 'left', 
                                marginTop: '10px'
                            }
                        }
                >
                    {
                        hasClicked ? 
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{marginRight: '10px'}}width="16" height="16" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                            </svg>
                            Added
                        </span> :
                        <span>Add to library</span>
                    }
                </Button>
               <br/>
               <br/>
            </div>
            <div className='info'>
                <h1><u>{book.title}</u></h1>
                <h4 className='display-6' onClick={searchAuthor}>{book.author || 'N/A'}</h4>
                <br/>
                <h5>Publisher: {book.publisher || 'N/A'}</h5>
                <h5>Published: {book.publishedDate || 'N/A'}</h5>
                <h5>Rating: {book.rating} {stars[book.rating] || 'N/A'}</h5>
                <h5>Page Count: {book.pages || 'N/A'}</h5>
                <Button
                    className='add-btn-mobile' 
                    variant= {
                        hasClicked ?
                        'success' :
                        'primary'
                    }
                    onClick={addBook}
                    style={
                            {
                                float: 'left', 
                                marginTop: '10px'
                            }
                        }
                >
                    {
                        hasClicked ? 
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{marginRight: '10px'}}width="16" height="16" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                            </svg>
                            Added
                        </span> :
                        <span>Add to library</span>
                    }
                </Button>
                <h5 className='desc-text'>Description:</h5>
                <p>{book.description}</p>
            </div>
        </div>
    )
}

export default BookPage