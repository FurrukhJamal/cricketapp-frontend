import React, { useState, useContext } from 'react'
import "./Login.scss"
import { AuthContext } from '../context/AuthProvider'


function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {error, login} = useContext(AuthContext)

  function handleEmailChange(event){
    setEmail(event.target.value)
  }

  function handlePasswordChange(event){
    setPassword(event.target.value)
  }

  return (
    <div className = "Container">
      <div className='loginContainer'>
        <h1>Login</h1>
        <div>
          <form action="">
            <input value = {email} onChange = {handleEmailChange} type="text" placeholder='Email' required />
            <input value = {password} onChange = {handlePasswordChange} type="password" placeholder='Password' required />
            {error && (
              <div>
                <p>Here will lie the error message</p>
              </div>
            )}
            <div>
              <button disabled = {(email && password) ? false : true}>Login</button>
            </div>
            
          </form>
        </div>
      </div>
      
    </div>
  )
}

export default Login