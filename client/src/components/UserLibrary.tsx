import React from 'react'
// import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import { RootState } from '../redux/rootReducer'
import '../styles/userLibrary.css'
import NavDropdown from './NavDropdown'

export default function UserLibrary() {
    // const user = useSelector((state:RootState) => state.userInfo)
    // const dispatch = useDispatch()

    return (
        <div className='user-library-container'>
             <Link to='/search'>
                <img className='logo-searched' src='https://i.pinimg.com/564x/87/49/8f/87498f6392c7d93020311a4cc2dfad2a.jpg' alt='owl-img'/>
            </Link>
            <NavDropdown />
            <div className='dashboard'>
                <h1>Your Library</h1>
                <hr/>
                <p>Total (0)</p>
            </div>
        </div>
    )
}
