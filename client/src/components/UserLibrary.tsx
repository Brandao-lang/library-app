import React, { useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../redux/rootReducer'
import '../styles/userLibrary.css'
import NavDropdown from './NavDropdown'
import BooksDisplay from './userLibraryComponents/BooksDisplay'

export default function UserLibrary() {
    const dispatch = useDispatch()
    const userID = useSelector((state:RootState) => state.userInfo.id)
    
    useEffect(() => {
        async function getLibrary() {
            await axios.get('/getLibrary', {
                params: {
                    userID
                }
            })
            .then(res => {
                console.log(res.data)
                dispatch({type:'library/getLibrary', payload: res.data})

            }).catch(err => {
                console.log(`user library data error: ${err}`)
            })
        }
        getLibrary()
    
    },[userID, dispatch])

    return (
        <div className='user-library-container'>
             <Link to='/search'>
                <img className='logo-searched' src='https://i.pinimg.com/564x/87/49/8f/87498f6392c7d93020311a4cc2dfad2a.jpg' alt='book-img'/>
            </Link>
            <NavDropdown />
            <BooksDisplay />
        </div>
    )
}
