import React, { useState, useContext } from 'react'
import "./Login.scss"
import { AuthContext } from '../context/AuthProvider'


function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {error, login, errorMessage, setErrorMessage} = useContext(AuthContext)

  function handleEmailChange(event){
    setEmail(event.target.value)
  }

  function handlePasswordChange(event){
    setPassword(event.target.value)
  }

  async function handleSubmit(event){
    event.preventDefault()
    await login(email, password)  
  }

  return (
    <div className = "Container">
      <div className='loginContainer'>
        <h1>Login</h1>
        <div>
          <form action="" onSubmit = {handleSubmit}>
            <input value = {email} onChange = {handleEmailChange} type="text" placeholder='Email' required />
            <input value = {password} onChange = {handlePasswordChange} type="password" placeholder='Password' required />
            {error && (
              <div>
                <p>{errorMessage}</p>
              </div>
            )}
            <div>
              <button type = "submit" disabled = {(email && password) ? false : true}>Login</button>
            </div>
            
          </form>
        </div>
      </div>
      
    </div>
  )
}

export default Login