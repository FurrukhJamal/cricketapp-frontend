import { BrowserRouter, Routes, Route} from "react-router";

import React from 'react'
import Home from "./routes/home";
import Teams from "./routes/Teams";
import Fixtures from "./routes/Fixtures";
import MatchDay from "./routes/MatchDay";

function AppNavigation() {
  return (
    
    <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "matchday" element = {<MatchDay/>}/>
        <Route path = "teams" element = {<Teams/>}/>
        <Route path = "fixtures" element = {<Fixtures/>}/>
    </Routes>

  )
}

export default AppNavigation