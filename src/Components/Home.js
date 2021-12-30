import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import Layout from './Layout';
import styled from 'styled-components';
import * as config from '../config/Config';

const Home = () => {

  const [Data, setDate] = useState({
    signIn: "",
  signInDaily: "",
  subscribers: "",
  subscribers1: "",
  subscribers6: "",
  subscribers12: "",
  subscribersDaily: ""
  });

  const {signIn,signInDaily,subscribers, subscribers1, subscribers6,  subscribers12, subscribersDaily} = Data;

  useEffect(() => {
    
    const admin = JSON.parse(localStorage.getItem('admin'));
    //console.log(admin);


    axios
      .get(`${config.SERVER_URL}/main`, {
        headers: { admincode: admin.IdState},
      })
      .then(res => {
        let result = res.data;
        console.log(result);
        setDate({
        ...Data,
        signIn: result.signIn,
        signInDaily: result.signInDaily,
        subscribers: result.subscribers,
        subscribers1: result.subscribers1,
        subscribers6: result.subscribers6,
        subscribers12: result.subscribers12,
        subscribersDaily: result.subscribersDaily
        });
        
      })
      .catch(err => {
        console.log(err);
      });
  },[]);

  return (
    <Layout>
      <Box h={{ md: '100%', lg: '100vh' }}>
        <Text
          fontSize="2xl"
          fontWeight="200"
          padding="30px"
          alignItems="center"
        >
          🗂 Dash Board
        </Text>
        <TableGrid columns={{ sm: 2, md: 3 }} spacing="20px">
          <Box bg="#fff" height="130px" className="HomeTd">
            <h4>누적 가입회원</h4>
            <p>{signIn} 명</p>
          </Box>
          <Box bg="#fff" height="130px" className="HomeTd">
            <h4>당일 가입회원</h4>
            <p>{signInDaily} 명</p>
          </Box>
          <Box bg="#fff" height="130px" className="HomeTd">
            <h4>당일 구독회원</h4>
            <p>{subscribersDaily} 명</p>
          </Box>
          <Box bg="#fff" height="130px" className="HomeTd">
            <h4>누적 구독회원</h4>
            <p>{subscribers} 명</p>
          </Box>
          <Box bg="#fff" height="130px" className="HomeTd">
            <h4>누적 1개월 구독회원</h4>
            <p>{subscribers1} 명</p>
          </Box>
          <Box bg="#fff" height="130px" className="HomeTd">
            <h4>누적 6개월 구독회원</h4>
            <p>{subscribers6} 명</p>
          </Box>
          <Box bg="#fff" height="130px" className="HomeTd">
            <h4>누적 1년 구독 회원</h4>
            <p>{subscribers12} 명</p>
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
