import React , {useState}from 'react';
import {
  Box,
  VStack,
  CloseButton,

} from '@chakra-ui/react';


const Sider = ({onClose}) => {

  return (
    <Box
      transition="300ms ease"
      bg="white"
      borderRight="1px"
      borderRightColor="gray.300"
      w={{md: 60 }}
      pos="fixed"
      top={0}
      h="full"
      paddingTop='60px'
      backgroundColor="#f9f9f9"
     
    >
      <VStack 
      spacing="15px"
      >
        <Box>
          <h4>회원관리</h4>
          <ul>
            <li>회원 현황 조회</li>
            <li>로그인 기록 조회</li>
          </ul>
        </Box>
        <Box>
          <h4>회원관리</h4>
          <ul>
            <li>회원 현황 조회</li>
            <li>로그인 기록 조회</li>
          </ul>
        </Box>
        <Box>
          <h4>회원관리</h4>
          <ul>
            <li>회원 현황 조회</li>
            <li>로그인 기록 조회</li>
          </ul>
        </Box>
      </VStack>
    </Box>
  );
};

export default Sider;
