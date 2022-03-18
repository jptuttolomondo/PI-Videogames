import * as React from "react";
import {Route,Routes,BrowserRouter } from "react-router-dom";
import { LandingPage } from "../components/landing/landingPage";

import { Home } from "../components/home/home";
import Detail from "../components/cards/detail";


    
export const AppRouter=()=>{
        return(
<BrowserRouter>
            <Routes>
                <Route exact path="/" element={<LandingPage/>} > </Route>
                <Route exact path="/home" element={<Home/>} > </Route>
                <Route exact path="/videogame/:id" element={<Detail/>} > </Route>
                </Routes>
</BrowserRouter>
        )
}
