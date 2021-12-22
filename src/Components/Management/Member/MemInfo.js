import React from 'react';
import {Link} from 'react-router-dom'
import { Box } from '@chakra-ui/react';
import Layout from '../../Layout';
import styled from 'styled-components';

const MemInfo = () => {
  return (
    <Layout>
      <Box className='InfoContainer'>
        <Box>
          <div className="InfoBox">
            <h4>이름</h4>
            <p>이태용</p>
          </div>
          <div className="InfoBox">
            <h4>이메일 주소</h4>
            <p>Taeoxo@gmail.com</p>
          </div>
          <div className="InfoBox">
            <h4>가입일자</h4>
            <p>yyyy-mm-dd</p>
            {/* <p>{`${moment(billStart).format('YYYY-MM-DD')} ~ ${exp}`}</p> */}
          </div>
          <div className="InfoBox">
            <h4>결제내역</h4>
            <Link to='/payment' style={{textDecoration: 'underline'}}>보러가기</Link>
          </div>
          <div className="InfoBox">
            <h4>구독상품</h4>
            <p>6개월 정기결제</p>
          </div>
          <div className="InfoBox">
            <h4>이용기간</h4>
            <p>yyyy-mm-dd</p>
          </div>
          <div className="InfoBox">
            <h4>결제 예정일</h4>
            <p>yyyy-mm-dd</p>
          </div>
          <div className="InfoBox">
            <h4>결제 수단</h4>
            <p>신용카드/체크카드</p>
          </div>
          <BtnBox>
            <Back>뒤로 가기</Back>
            <Modify>수정</Modify>
          </BtnBox>
        </Box>
      </Box>
    </Layout>
  );
};

export default MemInfo;

const BtnBox = styled.div`
    width: 100%;
    text-align: center;
    padding: 30px 0;
`

const Back = styled.button`
    background-color : #b8c6db;
    padding: 2px 8px;
    border: 1px solid #b8c6db;
    border-radius: 5px;
    margin-right: 10px;
`

const Modify = styled.button`
    background-color : #444;
    padding: 2px 8px;
    border: 1px solid #444;
    border-radius: 5px;
    color : #fff;
`