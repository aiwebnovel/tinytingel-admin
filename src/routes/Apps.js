import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Home from '../Components/Home';

function Apps () {
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
        </Routes>
        </BrowserRouter>
    )
}

export default Apps;