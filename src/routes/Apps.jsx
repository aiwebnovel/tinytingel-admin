import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from 'Components/Home.jsx';
import Members from 'Components/Management/Member/Members.jsx';
import LoginLog from 'Components/Management/LoginLog.jsx';
import Questions from 'Components/Management/Questions.jsx';
import MemInfo from 'Components/Management/Member/MemInfo.jsx';
import Landing from 'Components/Landing/index.jsx';
import MemPay from 'Components/Management/Member/MemPay.jsx';
import QuestionDetail from 'Components/Management/QuestionDetail.jsx';
import Prompts from 'Components/Management/Prompts'
import PromptDetail from 'Components/Management/PromptDetail.jsx';
import CreatePropmt from 'Components/Management/CreatePrompt';
import PaymentLog from 'Components/Management/PaymentLog';
import NotFound from 'Common/NotFound';


function Apps() {

  const admin = JSON.parse(localStorage.getItem('admin'));

  
  return (
    //추가 될 부분
    <BrowserRouter>
      <Routes>
        {admin ? (
          <>
          <Route path="/" element={<Home />}></Route>
          <Route path="/members" element={<Members />}></Route>
          <Route path="/members/:id" element={<MemInfo />}></Route>
          <Route path="/members/:id/payment" element={<MemPay />}>
          </Route>
          <Route path="/loginlog" element={<LoginLog />}></Route>
          <Route path="/paymentlog" element={<PaymentLog />}></Route>
  
          <Route path="/questions/" element={<Questions />}></Route>
          <Route path="/questions/:id" element={<QuestionDetail />}></Route>
          <Route path="/prompts" element={<Prompts />}></Route>
          <Route path='/prompts/create' element={<CreatePropmt/>}/>
          <Route path='/prompts/:id' element={<PromptDetail/>}/>
          </>
        ) : (
          <>
          <Route path="/" element={<Landing  /> } />
           {/* 리디렉트 */}
          <Route path="*" element={<Navigate to='/' replace />} />
          </> )}
       {/* 404 */}
       <Route path='*' element={<NotFound/>}/>
      

      </Routes>
    </BrowserRouter>
  );
}

export default Apps;
