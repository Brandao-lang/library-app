import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/rootReducer'
import '../styles/userLibrary.css'

export default function UserLibrary() {
    const user = useSelector((state:RootState) => state.userInfo)
    const dispatch = useDispatch()

    const userLogout = () => {
        dispatch({type: 'user/LogoutUser'})
    }

    return (
        <div>
            <button className='log-out' onClick={userLogout}>logout</button>
            <h1>Welcome to your personal library, {user.username}</h1>
            <img src='https://png-5.vector.me/files/images/1/0/106834/open_book_clip_art_preview.jpg' alt='book'/>
        </div>
    )
}
