import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Components/Home';
import Members from '../Components/Management/Member/Members';
import LoginLog from '../Components/Management/LoginLog';
import Questions from '../Components/Management/Questions';
import MemInfo from '../Components/Management/Member/MemInfo';
import Landing from '../Components/Landing/index';
import MemPay from '../Components/Management/Member/MemPay'
import QuestionDetail from '../Components/Management/QuestionDetail';
//import Regist from '../Components/Landing/Regist';


function Apps() {
  return (
    /*
    //추가 될 부분
        {로그인 했을 시 ? 
            <BrowserRouter>
                <Routes>
                //로그인 전 랜딩 페이지
                    <Route path='/' element={<Landing/>
                    <Route path="/regist" element={<Regist/>}></Route> 
                </Routes>
            </BrowserRouter>
            : 
            아래 라우터 그대로}
        */
    <BrowserRouter>
      <Routes>
        <Route path='/landing' element={<Landing/>}/>
        {/* <Route path="/regist" element={<Regist/>}></Route>  */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/members" element={<Members />}></Route>
        <Route path="/info" element={<MemInfo />}></Route>
        <Route path="/payment" element={<MemPay/>}></Route> 
        <Route path="/log" element={<LoginLog />}></Route>
        <Route path="/questions/*" element={<Questions />}></Route>
        <Route path="/questions/detail" element={<QuestionDetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Apps;
