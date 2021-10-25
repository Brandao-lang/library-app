import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/signup.css'

interface SignupState {
    signup: {
        username: string,
        email: string,
        password: string
    }
}

export default function Signup() {
    const [input, setInput] = useState<SignupState['signup']>({
        username: '',
        email: '',
        password: ''
    })

    const inputHandler = (e:any) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = async(e:any) => {
        e.preventDefault()
        console.log(input)
        
        await axios.post('/signup', input)
        .then(res => {
            console.log(res.data)
            setInput({
                username: '',
                email: '',
                password: ''
            })
        
        }).catch (err => {
            console.log(`signup failed: ${err}`)
        })
    }


    return (
        <>
            <Link to='/search'>
                <img className='logo-searched' src='https://i.pinimg.com/564x/87/49/8f/87498f6392c7d93020311a4cc2dfad2a.jpg' alt='owl-img'/>
            </Link>
            <div className='sign-up-container'>
                <h1>Create an Account</h1>
                <form className='signup-form' onSubmit={submitHandler}>
                    <input className='form-control'
                        type='text'
                        name='username'
                        placeholder='username'
                        onChange={inputHandler}
                    />
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
                    <button className='btn btn-outline-primary'>Confirm</button>
                </form>
            </div>
        </>
    )
}