import React from 'react'
import BookSearch from './BookSearch'

export default function Homepage() {
    return (
        <div className='home-container'>
            <div className='login-signup-container'>
                <button className='signup'>Signup</button>
                <button className='login'>Login</button>
            </div>
            <BookSearch />
        </div>
    )
}