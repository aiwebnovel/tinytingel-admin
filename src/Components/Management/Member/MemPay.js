import React, {useEffect, useCallback, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../Layout';
import { Box } from '@chakra-ui/react';
import moment from 'moment';
import styled from 'styled-components';

import * as config from '../../../config/Config';

const MemPay = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [Data, setData] = useState({
    buyLog_tid:'',
    buyLog_plan: '',
    buyLog_UsingDate: '',
    buyLog_price: '',
    buyLog_signInDate: '',
  });

  const {buyLog_tid,
  buyLog_plan,
  buyLog_UsingDate,
  buyLog_price,
  buyLog_signInDate, } = Data;

  const fetchData = useCallback(async () => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    await axios
      .get(`${config.SERVER_URL}/user/list/pay/${id}?page=1&count=20`, {
        headers: { admincode: admin.IdState },
      })
      .then(res => {
        const result = res.data.data.list[0];
        console.log(result)
        
        if(result.buyLog_plan === null) {
          if(result.buyLog_price === '25000') {

            let MonthLater = moment(result.buyLog_signInDate).add('1','months').toDate();
            let formatMonth = moment(MonthLater).format('YYYY-MM-DD');
            console.log(formatMonth);
            setData({
              ...Data,
              buyLog_tid: result.buyLog_tid,
              buyLog_plan: result.buyLog_plan,
              buyLog_UsingDate: formatMonth,
              buyLog_price: result.buyLog_price,
              buyLog_signInDate: result.buyLog_signInDate,
            })
          }
          if(result.buyLog_price === '60000') {
            let MonthLater = moment(result.buyLog_signInDate).add('3','months').toDate();
            let formatMonth = moment(MonthLater).format('YYYY-MM-DD');
            console.log(formatMonth);
            setData({
              ...Data,
              buyLog_tid: result.buyLog_tid,
              buyLog_plan: result.buyLog_plan,
              buyLog_UsingDate: formatMonth,
              buyLog_price: result.buyLog_price,
              buyLog_signInDate: result.buyLog_signInDate,
            })
          }
          if(result.buyLog_price === '90000') {
            let MonthLater = moment(result.buyLog_signInDate).add('6','months').toDate();
            let formatMonth = moment(MonthLater).format('YYYY-MM-DD');
            console.log(formatMonth);
            setData({
              ...Data,
              buyLog_tid: result.buyLog_tid,
              buyLog_plan: result.buyLog_plan,
              buyLog_UsingDate: formatMonth,
              buyLog_price: result.buyLog_price,
              buyLog_signInDate: result.buyLog_signInDate,
            })
          }
        }else {
        let MonthLater = moment(result.buyLog_signInDate).add(result.buyLog_plan,'months').toDate();
        let formatMonth = moment(MonthLater).format('YYYY-MM-DD');
        console.log(formatMonth);
        setData({
          ...Data,
          buyLog_tid: result.buyLog_tid,
          buyLog_plan: result.buyLog_plan,
          buyLog_UsingDate: formatMonth,
          buyLog_price: result.buyLog_price,
          buyLog_signInDate: result.buyLog_signInDate,
        })
      }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  return (
    <Layout>
      <Box className='PaymentContainer'>
        <Box>
          <div className="payBox">
            <h4>주문번호</h4>
            <p>{buyLog_tid}</p>
          </div>
          <div className="payBox">
            <h4>구독 상품</h4>
            <p>{buyLog_plan !==null ? `${buyLog_plan}개월 정기결제` : '구독해지' }</p>
          </div>
          <div className="payBox">
            <h4>이용 기간</h4>
            <p>{`${moment(buyLog_signInDate).format('YYYY-MM-DD')} ~ ${buyLog_UsingDate}`}</p>
          </div>
          <div className="payBox" style={{ backgroundColor: '#f9f9f9' }}>
            <h4>주문 총액</h4>
            {buyLog_price}원
          </div>
          <div className="payBox">
            <h4>주문일시</h4>
            <p>{buyLog_signInDate}</p>
          </div>
          <div className="payBox">
            <h4>주문 상태</h4>
            <p>{buyLog_plan !== null ? `${buyLog_plan}개월 결제 중` : `구독 취소`}</p>
          </div>
          <div className="payBox">
            <h4>결제 수단</h4>
            <p>신용카드/체크카드</p>
          </div>
          <BtnBox>
            <Back onClick={()=>{
              navigate(`/members/${id}`);
            }}>뒤로 가기</Back>
          </BtnBox>
        </Box>
      </Box>
    </Layout>
  );
};

export default MemPay;

const BtnBox = styled.div`
  width: 100%;
  text-align: center;
  padding: 30px 0;
`;

const Back = styled.button`
  background-color: #b8c6db;
  padding: 2px 8px;
  border: 1px solid #b8c6db;
  border-radius: 5px;
  margin-right: 10px;
`;