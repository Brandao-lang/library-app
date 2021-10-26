import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
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
             <Link to='/search'>
                <img className='logo-searched' src='https://i.pinimg.com/564x/87/49/8f/87498f6392c7d93020311a4cc2dfad2a.jpg' alt='owl-img'/>
            </Link>
           <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{"marginRight" : "10px", "fill" : "#fff", "transform" : "msFilter"}}><path d="M12 2A10.13 10.13 0 0 0 2 12a10 10 0 0 0 4 7.92V20h.1a9.7 9.7 0 0 0 11.8 0h.1v-.08A10 10 0 0 0 22 12 10.13 10.13 0 0 0 12 2zM8.07 18.93A3 3 0 0 1 11 16.57h2a3 3 0 0 1 2.93 2.36 7.75 7.75 0 0 1-7.86 0zm9.54-1.29A5 5 0 0 0 13 14.57h-2a5 5 0 0 0-4.61 3.07A8 8 0 0 1 4 12a8.1 8.1 0 0 1 8-8 8.1 8.1 0 0 1 8 8 8 8 0 0 1-2.39 5.64z"></path><path d="M12 6a3.91 3.91 0 0 0-4 4 3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4zm0 6a1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2 1.91 1.91 0 0 1-2 2z"></path></svg>{user.username}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a className="dropdown-item" href='/my-library'>My Library</a></li>
                    <li><a className="dropdown-item" onClick={userLogout} href='/login'>Logout</a></li>
                </ul>
            </div>
            <h1>Welcome to your personal library, {user.username}</h1>
            <img src='https://png-5.vector.me/files/images/1/0/106834/open_book_clip_art_preview.jpg' alt='book'/>
        </div>
    )
}
