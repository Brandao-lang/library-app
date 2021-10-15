import axios from 'axios'
import React, { useState } from 'react'
import '../styles/booksearch.css'

export interface BookSearchState {
    query: {
        title: string,
        author: string
    },
    results: {
        bookTitle: string,
        author: string,
        averageRating: number,
        imageLinks: string,
        publishedDate: string
    }[] 
}

interface AxiosShape {
    data: Array<{
        bookTitle: string, 
        author:string, 
        averageRating: number,
        imageLinks:string,
        publishedDate: string

    }>,
    length: number
}


export default function BookSearch () {
    const [query, setQuery] = useState<BookSearchState['query']>({
        title: '',
        author: ''
    })
    const [resultsArr, setResultsArr] = useState<BookSearchState['results']>([])
    
    const inputHandler = (e:any):void => {
        setQuery({
            ...query,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e:any) => {
        e.preventDefault()
        
        axios.get<AxiosShape['data']>('/fetchResults', {
            params: {
                title: query.title,
                author: query.author
            }
        }).then(res => {
            const resultsLength = res.data.length
            
            for (let i = 0; i< resultsLength; i++) {
                setResultsArr([...resultsArr, res.data[i]])
            }
            console.log(resultsArr)

        }).catch(err => {
            console.log(`SEARCH GET failed: ${err}`)
        })
    }
    
    return (
        <div className='form-container'>
            <form onSubmit={submitHandler} className='search-container'>
                <h1>Enter a Title, Author, or Both.</h1>
                <input
                    type='text'
                    name='title'
                    placeholder='Harry Potter...'
                    onChange={inputHandler}
                />
                <br/>
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