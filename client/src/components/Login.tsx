import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
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
            history.push('/my-library')
        
        }).catch (err => {
            console.log(`login failed: ${err}`)
        })
    }


    return (
        <div className='sign-up-container'>
            <h1>Login</h1>
            <form className='signup-form' onSubmit={submitHandler}>
               <input
                    type='text'
                    name='email'
                    placeholder='email'
                    onChange={inputHandler}
                />
                <input
                    type='password'
                    name='password'
                    placeholder='password'
                    onChange={inputHandler}
                />
                <br/>
                <button>login</button>
            </form>
        </div>
    )
}