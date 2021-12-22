import React from 'react';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import Layout from './Layout';
import styled from 'styled-components';

const Home = () => {
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
        <TableGrid columns={{ sm: 2, md: 4 }} spacing="20px">
          <Box bg="#fff" height="130px" className='HomeTd'>
            <h4>누적 가입회원</h4>
            <p>123명</p>
          </Box>
          <Box bg="#fff" height="130px" className='HomeTd'>
            <h4>당일 가입회원</h4>
            <p>1명</p>
          </Box>
          <Box bg="#fff" height="130px" className='HomeTd'>
            <h4>누적 구독회원</h4>
            <p>52명</p>
          </Box>
          <Box bg="#fff" height="130px" className='HomeTd'>
            <h4>누적 1개월 구독회원</h4>
            <p>38명</p>
          </Box>
          <Box bg="#fff" height="130px" className='HomeTd'>
            <h4>누적 6개월 구독회원</h4>
            <p>14명</p>
          </Box>
          <Box bg="#fff" height="130px" className='HomeTd'>
            <h4>누적 1년 구독 회원</h4>
            <p>14명</p>
          </Box>
          <Box bg="#fff" height="130px" className='HomeTd'>
            <h4>현재 이용회원</h4>
            <p>37명</p>
          </Box>
          <Box bg="#fff" height="130px" className='HomeTd'>
            <h4>1개월 구독회원</h4>
            <p>123명</p>
          </Box>
          <Box bg="#fff" height="130px" className='HomeTd'>
            <h4>6개월 구독회원</h4>
            <p>123명</p>
          </Box>
          <Box bg="#fff" height="130px" className='HomeTd'>
            <h4>1년 구독회원</h4>
            <p>123명</p>
          </Box>
          <Box bg="#fff" height="130px" className='HomeTd'>
         
          </Box>
          <Box bg="#fff" height="130px" className='HomeTd'>
       
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
