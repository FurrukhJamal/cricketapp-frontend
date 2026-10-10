import React from "react";
import { BrowserRouter, Routes, Route } from "react-router"
import Home from "./routes/home";
import Login from "./routes/Login";
import Register from "./routes/Register";

export default function AuthNavigation(){
    return(
    
        <Routes>
            <Route path = "/" element = {<Login/>}/>
            <Route path = "login" element = {<Login/>}/>
            <Route path = "register" element = {<Register/>}/>
        </Routes>
        
    )
}