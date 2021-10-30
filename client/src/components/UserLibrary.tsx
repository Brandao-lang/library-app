import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../redux/rootReducer'
import '../styles/userLibrary.css'
import NavDropdown from './NavDropdown'

export default function UserLibrary() {
    const dispatch = useDispatch()
    const user = useSelector((state:RootState) => state.userInfo.email)
    const library = useSelector((state: RootState) => state.userLibrary)

    useEffect(() => {
        async function getLibrary() {
            await axios.get('/GetLibrary', {
                params: {
                    user
                }
            })
            .then(res => {
                dispatch({type: 'library/GetLibrary', payload: res.data})

            }).catch(err => {
                console.log(`user library data error: ${err}`)
            })
        }
        getLibrary()
    
    },[user, dispatch])

    const deleteBook = async(index: number) => {
        dispatch({type: 'library/RemoveBook', payload: index})

        await axios.delete('/removeBook', {
            params: {
                index,
                user
            }
        })
        .then(res => {
            console.log('book deletion successful')
        }).catch(err => {
            console.log(`book could not be removed from the server: ${err}`)
        })
    }

    return (
        <div className='user-library-container'>
             <Link to='/search'>
                <img className='logo-searched' src='https://i.pinimg.com/564x/87/49/8f/87498f6392c7d93020311a4cc2dfad2a.jpg' alt='owl-img'/>
            </Link>
            <NavDropdown />
            <div className='dashboard'>
                <h1>Your Library</h1>
                <hr/>
                <p>Total ({library.userBooks.length})</p>
                <div className='book-list'>
                    {!library.userBooks ? 
                    <h1>No Books</h1> : 
                    library.userBooks.map((book: { image: string | undefined }, index: number) => {
                        return <div className='book-card'>
                                <img src={book.image} alt='book-cover' />
                                <p>Not Started 
                                    <svg onClick={() => deleteBook(index)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fill="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                </p>
                            </div>
                    })}
                </div>
            </div>
        </div>
    )
}
