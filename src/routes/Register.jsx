import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthProvider'

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [Cpassword, setCpassword] = useState("")

  const{error, setError, errorMessage, setErrorMessage} = useContext(AuthContext)

  function handleNameChange(event){
    if(errorMessage){
      setErrorMessage("")
    }
    setName(event.target.value)
  }

  function handleEmailChange(event){
    setEmail(event.target.value)
  }

  function handlePasswordChange(event){
    setPassword(event.target.value)
  }

  function handleCpasswordChange(event){
    setCpassword(event.target.value)
  }

  function handleSubmit(event){
    event.preventDefault()
    if(errorMessage){
      setErrorMessage("")
    }
  }

  function checkPasswords(){
    if(password !== Cpassword){
      setError(true)
      setErrorMessage("passwords don't match")
    }
  }

  return (
    <div className='container'>
      <div className = "registerContainer">
        <h1>Register</h1>
        <div>
          <form action="" onSubmit = {handleSubmit}>
            <input value = {name} onChange = {handleNameChange} type="text" placeholder='Name' required />
            <input value = {email} onChange = {handleEmailChange} type="text" placeholder='Email' required />
            <input value = {password} onChange = {handlePasswordChange} type="password" placeholder='Password' required />
            <input value = {Cpassword} onBlur = {checkPasswords} onChange = {handleCpasswordChange} type="password" placeholder='Confirm Password' required />
            {error && (
              <div>
                <p>{errorMessage}</p>
              </div>
            )}
            <div>
              <button type = "submit" disabled = {(name && email && password && Cpassword && (password == Cpassword)) ? false : true}>Register</button>
            </div>
            
          </form>
        </div>

      </div>
    </div>
  )
}

export default Register