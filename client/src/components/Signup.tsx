import React, { useState } from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../styles/signup.css'
import { Alert } from 'react-bootstrap'


interface SignupState {
    signup: {
        username: string,
        email: string,
        password: string,
        confirmPassword: string
    }
}

const Signup: React.FC = () => {
    const [input, setInput] = useState<SignupState['signup']>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [signupError, setSignupError] = useState(false)
    const history = useHistory()

    const inputHandler = (e:any) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = async(e:any) => {
        e.preventDefault()
        
        if (input.password !== input.confirmPassword) {
            setSignupError(true)
            return
        }

        await axios.post('/signup', input)
        .then(res => {
            console.log(res.data)
            setInput({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
            history.push('/success')
        
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
                    <input className='form-control'
                        type='password'
                        name='confirmPassword'
                        placeholder='confirm password'
                        onChange={inputHandler}
                    />
                    <br/>
                    <Alert className={signupError ? 'login-alert-show' : 'login-alert-hide'} variant='danger'>Passwords do not match</Alert>
                    <button className='btn btn-outline-primary'>Confirm</button>
                </form>
            </div>
        </>
    )
}

export default Signup