import React, { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Layout from '../../Layout';
import styled from 'styled-components';

import * as config from '../../../config/Config';

const MemInfo = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [Data, setData] = useState({
    identifier: ' ',
    logInDate: '',
    membership_count: '',
    user_name: '',
    payment_date: '',
    signInDate: '',
  });

  const {
    identifier,
    logInDate,
    membership_count,
    user_name,
    payment_date,
    signInDate,
  } = Data;

  const fetchData = useCallback(async () => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    await axios
      .get(`${config.SERVER_URL}/user/detail/${id}`, {
        headers: { admincode: admin.IdState },
      })
      .then(res => {
        console.log(res);
        const result = res.data;
        setData({
          ...Data,
          identifier: result.identifier,
          logInDate: result.logInDate,
          membership_count: result.membership_count,
          user_name: result.name,
          payment_date: result.payment_date,
          signInDate: result.signInDate,
        });
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
      <Box className="InfoContainer">
        <Box>
          <div className="InfoBox">
            <h4>이름</h4>
            <p>{user_name}</p>
          </div>
          <div className="InfoBox">
            <h4>이메일 주소</h4>
            <p>{identifier}</p>
          </div>
          <div className="InfoBox">
            <h4>가입일자</h4>
            <p>{signInDate.slice(0, 11)}</p>
            {/* <p>{`${moment(billStart).format('YYYY-MM-DD')} ~ ${exp}`}</p> */}
          </div>
          <div className="InfoBox">
            <h4>결제내역</h4>
            {payment_date !== '' ? (
              <Link
                to={`/members/${id}/payment`}
                style={{ textDecoration: 'underline' }}
              >
                보러가기
              </Link>
            ) : (
              '멤버십을 구독하지 않은 회원입니다.'
            )}
          </div>
          <div className="InfoBox">
            <h4>구독상품</h4>
            <p>
              {payment_date !== ''
                ? '6개월 정기결제'
                : '멤버십을 구독하지 않은 회원입니다.'}
            </p>
          </div>
          <div className="InfoBox">
            <h4>이용기간</h4>
            <p>
              {payment_date !== ''
                ? 'YYYY-MM-DD'
                : '멤버십을 구독하지 않은 회원입니다.'}
            </p>
          </div>
          <div className="InfoBox">
            <h4>결제 예정일</h4>
            <p>
              {payment_date !== ''
                ? 'YYYY-MM-DD'
                : '멤버십을 구독하지 않은 회원입니다.'}
            </p>
          </div>
          <div className="InfoBox">
            <h4>결제 수단</h4>
            <p>
              {payment_date !== ''
                ? '신용카드/체크카드'
                : '멤버십을 구독하지 않은 회원입니다.'}
            </p>
          </div>
          <BtnBox>
            <Back onClick={()=>{
              navigate(`/members`);
            }}>뒤로 가기</Back>
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
`;

const Back = styled.button`
  background-color: #b8c6db;
  padding: 2px 8px;
  border: 1px solid #b8c6db;
  border-radius: 5px;
  margin-right: 10px;
`;

const Modify = styled.button`
  background-color: #444;
  padding: 2px 8px;
  border: 1px solid #444;
  border-radius: 5px;
  color: #fff;
`;
