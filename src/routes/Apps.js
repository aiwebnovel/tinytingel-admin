import React, { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Components/Home';
import Members from '../Components/Management/Member/Members';
import LoginLog from '../Components/Management/LoginLog';
import Questions from '../Components/Management/Questions';
import MemInfo from '../Components/Management/Member/MemInfo';
import Landing from '../Components/Landing/index';
import MemPay from '../Components/Management/Member/MemPay';
import QuestionDetail from '../Components/Management/QuestionDetail';
import { IdState } from '../config/Recoil';
import { useRecoilState, useRecoilValue } from 'recoil';

function Apps() {
  console.log(useRecoilValue(IdState));
  const admin = useRecoilValue(IdState);

  return (
    //추가 될 부분
    <BrowserRouter>
      <Routes>
        {admin ? (
          <Route path="/" element={<Home />}></Route>
        ) : (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/members" element={<Members />}></Route>
            <Route path="/info" element={<MemInfo />}></Route>
            <Route path="/payment" element={<MemPay />}></Route>
            <Route path="/log" element={<LoginLog />}></Route>
            <Route path="/questions/*" element={<Questions />}></Route>
            <Route
              path="/questions/detail"
              element={<QuestionDetail />}
            ></Route>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Apps;
