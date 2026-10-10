import { BrowserRouter, Routes, Route} from "react-router";

import React from 'react'
import Home from "./routes/home";

function AppNavigation() {
  return (
    
    <Routes>
        <Route path = "/" element = {<Home/>}/>
    </Routes>

  )
}

export default AppNavigation