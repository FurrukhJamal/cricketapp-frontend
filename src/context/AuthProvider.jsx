import { createContext, useState } from "react";
export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [token, setToken] = useState(()=>{
    try {
      let token = localStorage.getItem("cricketApp-token")
      return token  
    } catch (error) {
      console.log(error)
      return null
    }
  })

    const [user, setUser] = useState({})
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
  return (
    <AuthContext.Provider value = {{
        setUser,
        errorMessage,
        setErrorMessage,
        setError,
        error,
        token,
        setToken,
        login : async(email, password)=>{
            let response = await fetch("http://localhost:3000/api/login", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                },
                body : JSON.stringify({
                    email : email,
                    password : password
                })
            })

            if(!response.ok){
              setError(true)  
              let result = await response.json()
              setErrorMessage(result.error)
              return 
            }
            let jwtoken = response.headers.get("x-auth-token")
            localStorage.setItem("cricketApp-token", jwtoken)
            setToken(jwtoken)

            let user = await response.json()
            setUser(user)
            

        }
    }}>
        {children}
    </AuthContext.Provider>
  )
}