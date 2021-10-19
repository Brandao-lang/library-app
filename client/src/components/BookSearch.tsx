import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import axios from 'axios'
import '../styles/booksearch.css'
import { HomePageState } from './Homepage'

export interface BookSearchState {
    query: {
        title: string,
        author: string
    }
}

interface BookSearchProps {
    updateResults(data: HomePageState['results']):void
}

interface AxiosShape {
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

    const inputHandler = (e:any):void => {
        setQuery({
            ...query,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = async(e:any) => {
        e.preventDefault()
        
        axios.get<AxiosShape['data']>('/fetchResults', {
            params: {
                title: query.title,
                author: query.author
            }
        }).then(res => {
           setHasSearched(true)
           props.updateResults(res.data)
        
        }).catch(err => {
            console.log(`SEARCH GET failed: ${err}`)
        })
    }

    useEffect(() => {
        setHasSearched(location.pathname === '/' ? false : true)
    },[setHasSearched, location.pathname],)
    
    return (
        <div className={!hasSearched ? 'form-container' : 'form-container-top'}>
            <form onSubmit={submitHandler} className={!hasSearched ? 'search-container' : 'search-container-centered'}>
                <h1 className={!hasSearched ? '' : 'hide-title'}>Enter a Title, Author, or Both.</h1>
                <input
                    type='text'
                    name='title'
                    placeholder='Harry Potter...'
                    onChange={inputHandler}
                />
                <input
                    type='text'
                    name='author'
                    placeholder='J.K Rowling...'
                    onChange={inputHandler}
                />
                <br/>
                <button>Search</button>
            </form>
        </div>
    )
}

export default BookSearch