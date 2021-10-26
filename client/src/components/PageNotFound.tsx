import React from 'react'
import { Link } from 'react-router-dom'

export const PageNotFound = () => {
    return (
        <div>
            <h1>Page does not exist</h1>
            <Link to='/search'>
                <p>return to search page</p>
            </Link>
        </div>
    )
}