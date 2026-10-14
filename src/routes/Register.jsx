import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthProvider'
import "./LoginRegister.scss"
import { Link, useNavigate, useNavigation } from 'react-router'

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [Cpassword, setCpassword] = useState("")
  const navigate = useNavigate()

  const{error, setError, errorMessage, setErrorMessage, setToken, setUser} = useContext(AuthContext)

  function handleNameChange(event){
    if(errorMessage){
      setErrorMessage("")
      setError(false)
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

  async function handleSubmit(event){
    event.preventDefault()
    if(errorMessage){
      setErrorMessage("")
      setError(false)
    }
    let response = await fetch("http://localhost:3000/api/register", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body : JSON.stringify({
        name : name,
        email : email,
        password : password,
        repeat_password : Cpassword
      })
    })

    if(!response.ok){
      setError(true)
      let result = await response.json()
      setErrorMessage(result.error)
      return
    }
    let jwtToken = response.headers.get("x-auth-token")
    let user = await response.json()

    localStorage.setItem("cricketApp-token", jwtToken)

    setUser(user)
    setToken(jwtToken)

    navigate("/")
  }

  function checkPasswords(){
    if(password !== Cpassword){
      setError(true)
      setErrorMessage("passwords don't match")
    }
  }

  return (
    <div className='Container'>
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
        <div>
          <p>Already a registered user? <Link to = "/login">Login</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Register