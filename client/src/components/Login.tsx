import axios from 'axios'
import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import '../styles/signup.css'

interface LoginState {
    login: {
        email: string,
        password: string
    }
}

export default function Login() {
    const [input, setInput] = useState<LoginState['login']>({
        email: '',
        password: ''
    })
    const [loginError, setLoginError] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const inputHandler = (e:any) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = async(e:any) => {
        e.preventDefault()
        
        await axios.get('/login', {
            params: {
                email: input.email,
                password: input.password
            }
        } )
        .then(res => {
            console.log(res.data)
            dispatch({type: 'user/LoginUser', payload: res.data})
            setInput({
                email: '',
                password: ''
            })
            history.push('/my-library/all-books')
        
        }).catch (err => {
            console.log(`login failed: ${err}`)
            setLoginError(true)
        })
    }


    return (
        <>
            <Link to='/search'>
                <img className='logo-searched' src='https://i.pinimg.com/564x/87/49/8f/87498f6392c7d93020311a4cc2dfad2a.jpg' alt='owl-img'/>
            </Link>
            <div className='sign-up-container'>
                <h1>Login</h1>
                <form className='signup-form'>
                <input className='form-control'
                        type='text'
                        name='email'
                        placeholder='email'
                        onChange={inputHandler}
                    />
                    <input className='form-control'
                        type='password'
                        name='password'
                        placeholder='password'
                        onChange={inputHandler}
                    />
                    <br/>
                    <Alert className={loginError ? 'login-alert-show' : 'login-alert-hide'} variant='danger'>Incorrect username or password</Alert>
                    <Link to='/signup'>register an account</Link>
                    <br/>
                    <br/>
                    <button className='btn btn-outline-primary' onClick={submitHandler}>login</button>
                </form>
            </div>
        </>
    )
}