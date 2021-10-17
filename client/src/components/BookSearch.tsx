import axios from 'axios'
import React, { useState } from 'react'
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

        //delete this
    //     await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query.title}+inauthor:${query.author}&filter=ebooks&maxResults=40&key=AIzaSyAAlwcY5uO4t1n6OS9nTQl7ZQHz7cLGh40`)
    //  .then(res => console.log(res.data))
        //delete this
        
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