import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/rootReducer'

interface BookInfoProps {
    title: string
}

const BookPage: React.FC<BookInfoProps> = (props) => {
    const book = useSelector((state:RootState) => state.bookInfo)

    return (
        <div>
            <img src={book.image} alt='cover-art'/>
            <h1>{book.title}</h1>
            <h3>Written by: {book.author || 'N/A'}</h3>
            <h3>Publisher: {book.publisher || 'N/A'}</h3>
            <h3>Published: {book.publishedDate || 'N/A'}</h3>
            <h3>Rating: {book.rating || 'N/A'} stars</h3>
            <h3>Page Count: {book.pages || 'N/A'}</h3>
            <h2>Description:</h2>
            <p style={{'width': '50%', 'margin': '0 auto'}}>{book.description}</p>
        </div>
    )
}

export default BookPage