import axios from 'axios'
import React, { useState } from 'react'
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
        <div className='sign-up-container'>
            <h1>Create an Account</h1>
            <form className='signup-form' onSubmit={submitHandler}>
                <input
                    type='text'
                    name='username'
                    placeholder='username'
                    onChange={inputHandler}
                />
                <input
                    type='text'
                    name='email'
                    placeholder='email'
                    onChange={inputHandler}
                />
                <input
                    type='text'
                    name='password'
                    placeholder='password'
                    onChange={inputHandler}
                />
                <br/>
                <button>Confirm</button>
            </form>
        </div>
    )
}