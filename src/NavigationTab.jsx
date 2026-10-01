import React from "react";
import { BrowserRouter, Routes, Route } from "react-router"
import Home from "./routes/home";
import Login from "./routes/Login";
import Register from "./routes/Register";

export default function Navigation(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path = "/" element = {<Home/>}/>
                <Route path = "login" element = {<Login/>}/>
                <Route path = "register" element = {<Register/>}/>
            </Routes>
        </BrowserRouter>
    )
}