import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, SimpleGrid, Text, useToast } from '@chakra-ui/react';
import Layout from 'Common/Layout.jsx';
import styled from 'styled-components';
import * as server from 'config/Config';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const toast = useToast();
  const navigate = useNavigate();

  const [userData, setData] = useState({
    signup : '',
    accumulateSum:'',
    currentSum:'',
    accumulateOne:'',
    currentOne : '',
    accumulateThree:'',
    currentThree : '',
    accumulateSix:'',
    currentSix: '',
  }) 

  const {signup, accumulateSum, currentSum, accumulateOne, currentOne ,
    accumulateThree, currentThree , accumulateSix, currentSix,} = userData;

  const fetchData = async () => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    
    const config ={
      method: "get",
      url: `${server.SERVER_URL}/user`,
      headers: { Authorization: `Bearer ${admin.adminState.token}` },
    }
    if(admin === null) {
      localStorage.clear();
      navigate('/', { replace: true });
    } else {
    await axios(config)
      .then(response => {
        console.log(response);
        const data = response.data.data;
        const subscribeAccumulate = data.subscribe.accumulate;
        const subscribeCurrent = data.subscribe.current;

        const ArraryAccValues = Object.values(subscribeAccumulate);
        const ArraryCurValues = Object.values(subscribeCurrent);

        const AccValueSum = parseInt(ArraryAccValues[0]) + parseInt(ArraryAccValues[1]) + parseInt(ArraryAccValues[2]);
        const CurValueSum = parseInt(ArraryCurValues[0]) + parseInt(ArraryCurValues[1]) + parseInt(ArraryCurValues[2]);


        setData({
          ...userData,
          signup:data.signup,
          accumulateSum:AccValueSum,
          currentSum:CurValueSum,
          accumulateOne: ArraryAccValues[0],
          currentOne : ArraryCurValues[0],
          accumulateThree:ArraryAccValues[1],
          currentThree : ArraryCurValues[1],
          accumulateSix:ArraryAccValues[2],
          currentSix: ArraryCurValues[2],
        });

      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 412) {
          // localStorage.clear();
          // navigate('/', { replace: true });
          setTimeout(
            toast({
              title: '토큰이 만료됐습니다.',
              description: '새로 로그인 해주세요!',
              position: 'top-right',
              status: 'error',
              duration: 5000,
              isClosable: true,
            }),
            5000
          );
        }
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <Box>
        <Text
          fontSize="2xl"
          fontWeight="200"
          padding="20px 30px"
          alignItems="center"
        >
          🗂 Dash Board
        </Text>
        <TableGrid columns={{ sm: 2, md: 3 }} spacing="10px">
          <Box bg="#fff" height="130px" className="HomeTd">
            <h4>누적 가입회원</h4>
            <p>{signup.accumulate} 명</p>
          </Box>
          <Box bg="#fff" height="130px" className="HomeTd">
            <h4>당일 가입회원</h4>
            <p>{signup.daily} 명</p>
          </Box>
          <Box bg="#fff" height="130px" className="HomeTd">
            <h4>누적 구독회원</h4>
            <p>{accumulateSum} 명</p>
          </Box>
          <Box bg="#fff" height="130px" className="HomeTd">
            <h4>누적 1개월 구독회원</h4>
            <p>{accumulateOne} 명</p>
          </Box>
          <Box bg="#fff" height="130px" className="HomeTd">
            <h4>누적 3개월 구독회원</h4>
            <p>{ accumulateThree} 명</p>
          </Box>
          <Box bg="#fff" height="130px" className="HomeTd">
            <h4>누적 6개월 구독 회원</h4>
            <p>{accumulateSix} 명</p>
          </Box>
          <Box bg="#fff" height="130px" className="HomeTd">
            <h4>현재 이용회원</h4>
            <p>{currentSum} 명</p>
          </Box>
          <Box bg="#fff" height="130px" className="HomeTd">
            <h4>1개월 구독회원</h4>
            <p>{currentOne} 명</p>
          </Box>
          <Box bg="#fff" height="130px" className="HomeTd">
            <h4>3개월 구독회원</h4>
            <p>{currentThree} 명</p>
          </Box>
          <Box bg="#fff" height="130px" className="HomeTd">
            <h4>6개월 구독 회원</h4>
            <p>{currentSix} 명</p>
          </Box>

        </TableGrid>
      </Box>
    </Layout>
  );
};

export default Home;

const TableGrid = styled(SimpleGrid)`
  padding: 64px;

  > div {
    border: 1px solid #444;
  }
`;
