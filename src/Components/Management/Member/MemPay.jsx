import React, {useEffect, useCallback, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from 'Common/Layout';
import { Box, Heading } from '@chakra-ui/react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import {BtnBox} from 'styles/ComponentStyle';
import * as config from 'config/Config';

const MemPay = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [Data, setData] = useState('');

  const fetchData = useCallback(async () => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    if(admin === null) {
      window.location.replace('/'); 
   } else {
 

    await axios
      .get(`${config.SERVER_URL}/user/plan/log?user_uid=fWkg8RFPVKVQbzPH4t7UXVcOoud2`, {
        headers: { Authorization: `Bearer ${admin.adminState.token}` },
      })
      .then(response => {
       // console.log(response);
        const data = response.data.data;
        setData(data);
      })
      .catch(err => {
        console.log(err);
      });
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);


  return (
    <Layout>
      <Box className='PaymentContainer'>
      {Data.length > 0 ? Data.map((item)=>(
        <Box className='InfoContent'>
        <Heading as='h4' size='md' margin='15px 0 15px 15px' >
          💡 Receipt
        </Heading>
          <div className="payBox">
            <h4>주문번호</h4>
            <p>{item.tid}</p>
          </div>
          <div className="payBox">
            <h4>구독 상품</h4>
            <p>
              {item.plan}개월
            </p>
          </div>
          <div className="payBox" style={{ backgroundColor: '#f9f9f9' }}>
            <h4>주문 총액</h4>
            {item.price}원
          </div>
          <div className="payBox">
            <h4>주문일시</h4>
            <p>{dayjs(item.orderDate).format('YYYY-MM-DD')}</p>
          </div>
          <div className="payBox">
            <h4>주문 상태</h4>
            <p>결제완료</p>
          </div>
          <div className="payBox">
            <h4>결제 수단</h4>
            <p>
              {item.service === 'iamport' &&
                '카카오페이'}
              {item.service === 'innopay' &&
                '신용/체크'}
              {item.service === "kakao" && "카카오페이"}
              {item.service === "inicis" && "신용/체크카드 결제"}
              {item.service === 'nopassbook' &&
                '무통장'}
            </p>
          </div>
         
        </Box>
       )): <Box className='InfoContent'>결과가 없습니다.</Box>}
        <BtnBox>
            <Back onClick={()=>{
              navigate(`/members/${id}`);
            }}>뒤로 가기</Back>
          </BtnBox>
      </Box>
    </Layout>
  );
};

export default MemPay;

const Back = styled.button`
  background-color: #b8c6db;
  padding: 2px 8px;
  border: 1px solid #b8c6db;
  border-radius: 5px;
  margin-right: 10px;
`;