import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Components/Home';
import Landing from '../Components/Landing/index';
import Regist from '../Components/Landing/Regist';


function Apps() {
  return (
    /*
    //추가 될 부분
        {로그인 했을 시 ? 
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Landing/>}
                </Routes>
            </BrowserRouter>
            : 
            아래 라우터 그대로}
        */
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />}></Route> */}
        <Route path="/" element={<Landing />}></Route>
        <Route path="/regist" element={<Regist/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Apps;
