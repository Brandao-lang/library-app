import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../styles/booksearch.css'
import { HomePageState } from './Homepage'
import { Spinner } from 'react-bootstrap'

export interface BookSearchState {
    query: {
        title: string,
        author: string
    }
}

interface BookSearchProps {
    updateResults(data: HomePageState['results']):void
}

export interface AxiosShape {
    data: Array<{
        bookTitle: string, 
        author:string,
        description: string,
        pageCount: number,
        publisher: string, 
        averageRating: number,
        imageLinks:string,
        publishedDate: string
    }>,
    length: number
}

const BookSearch:React.FC<BookSearchProps> = (props) => {
    const location = useLocation()
    const [query, setQuery] = useState<BookSearchState['query']>({
        title: '',
        author: ''
    })
    const [hasSearched, setHasSearched] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const inputHandler = (e:any):void => {
        setQuery({
            ...query,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = async(e:any) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            await axios.get<AxiosShape['data']>('/fetchResults', {
                params: {
                    title: query.title,
                    author: query.author
                }
            }).then(res => {
               setHasSearched(true)
               props.updateResults(res.data)
            })

        } catch (err) {
            console.log(`SEARCH GET failed: ${err}`)

        } finally {
            setIsLoading(false)

        }
    }

    useEffect(() => {
        setHasSearched(location.pathname === '/search' ? false : true)
    },[setHasSearched, location.pathname])
    
    return (
        <div className={!hasSearched ? 'form-container' : 'form-container-top'}>
            
            <Link to='/search'>
                <img 
                    className={hasSearched ? 
                                'logo-searched' : 
                                'logo-default'}
                    src='https://i.pinimg.com/564x/87/49/8f/87498f6392c7d93020311a4cc2dfad2a.jpg' 
                    alt='book-img'
                    />
            </Link>
            <form 
                onSubmit={submitHandler} 
                className={!hasSearched ? 
                            'search-container' : 
                            'search-container-centered'}
                >
               <h1 className={!hasSearched ? 
                            'title' : 
                            'hide-title'}
                >
                    Enter a Title, Author, or Both.
                </h1>
                <input className='form-control'
                        type='text'
                        name='title'
                        placeholder='Harry Potter...'
                        onChange={inputHandler}
                />
                <input className='form-control'
                        type='text'
                        name='author'
                        placeholder='J.K Rowling...'
                        onChange={inputHandler}
                />
                <br/>
                <button className="btn btn-outline-primary">
                    {isLoading ? 
                    <Spinner 
                        as="span" 
                        animation="border" 
                        size="sm"
                        role="status" 
                        aria-hidden="true"
                    /> : 
                    <svg 
                        className='svg-search' 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                    >
                        <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path>
                    </svg>}
                </button>
            </form>
        </div>
    )
}

export default BookSearch