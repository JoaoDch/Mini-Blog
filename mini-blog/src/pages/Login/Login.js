import React from 'react'
import styles from './Login.module.css'
import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const {login, error: authError, loading} = useAuthentication();

  const handleSubmit = async(e) => {
      e.preventDefault()

      setError('');

      const user = {
          email,
          password,
      };

      const res = await login(user)
      
      console.log(res);
  };

  useEffect (() => {
      if(authError) {
          setError(authError)
      }
  }, [authError])

  return (
    <div className={styles.login}>
        <h1>Log in!</h1>
        <p>Log in now, and share you history with your friends!</p>
        <form onSubmit={handleSubmit}>
            <label>
                <span>E-mail:</span>
                <input type='email' name='email' required placeholder='your email.' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <label>
                <span>Password:</span>
                <input type='password' name='password' required placeholder='enter your password.' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>
            {!loading && <button className='btn'>Enter</button>}
            {loading && <button className='btn' disabled>please wait...</button>}
            {error && <p className='error'>{error}</p>}
        </form>
    </div>
  )
}

export default Login