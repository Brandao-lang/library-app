import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router'
import { RootState } from '../redux/rootReducer'
import UserLibrary from './UserLibrary'



export default function PrivateRoute(...rest: any[]) {
    const loggedIn = useSelector((state:RootState) => state.userInfo.isLoggedIn)

    return (
        <div>
            <Route {...rest} render={() => {
                if (loggedIn) {
                    return <UserLibrary/>
                } else {
                    return <Redirect to='/login'/>
                }
            }}/>
        </div>
    )
}