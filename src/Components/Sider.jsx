import React from 'react';
import { Link } from 'react-router-dom';
import { Box, VStack, Heading, Flex, HStack } from '@chakra-ui/react';

import '../styles/style.scss';
import styled from 'styled-components';

const Headings = styled.h3`

margin-bottom : 5px;
font-size : 1.1rem;
font-weight : 600;

  &::before {
    content : "📌 "
  }
`

const Sider = () => {

  const AdminLogOut = () => {
    localStorage.clear();
    window.location.replace('/');
  }
  
  return (
    <Box
      transition="300ms ease"
      w={{ base: 'full', lg: 60 }}
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      pos="fixed"
      top={0}
      h="full"
      bg="#fff"
      display={{ base: 'none', lg: 'flex' }}
      boxShadow="rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;"
      padding="30px 0"
    >
      <VStack w='100%' spacing="35px">
        <Heading as="h3" size="lg" w='100%' padding={'10px 30px 10px'}>
          Admin
        </Heading>
        <Flex w='100%' direction="column" align="baseline" className="nav">
          <Headings>
            회원관리
          </Headings>
          <Link to="/members">회원 현황 조회</Link>
          <Link to="/paymentlog">결제 현황 조회</Link>
          <Link to="/loginlog">로그인 기록 조회</Link>
          
        </Flex>
        <Flex w='100%' direction="column" align="baseline" className="nav">
          <Headings>
            문의사항 관리
          </Headings>
          <Link to="/questions">문의사항 조회</Link>
        </Flex>
        <Flex w='100%'  direction="column" align="baseline" className="nav">
          <Headings>
            프롬프트 관리
          </Headings>
          <Link to="/prompts">프롬프트 관리</Link>
        </Flex>
      </VStack>
      <HStack spacing="25px" className="SiderBottom">
        <Link to="/">
          <GoHome>home</GoHome>
        </Link>
        <LogOut onClick={AdminLogOut}>Logout</LogOut>
      </HStack>
    </Box>
  );
};

export default Sider;
const GoHome = styled.button`
  background-color: #b8c6db;
  //border: 1px solid #b8c6db;
  border-radius: 5px;
  color: #444;
  padding: 5px 13px;
  transition: all 300ms ease;

  &:hover {
    background-color: #0098fa;
    //border: 1px solid #0098fa;
    color: #fff;
  }
`;

const LogOut = styled.button`
    background-color : #FF5A52;
    //border: 1px solid #FF5A52;
    border-radius: 5px;
    color : #fff;
    padding: 5px 13px;
    transition: all 300ms ease;

    &:hover {
      background-color:#D83536;
      //border: 1px solid #D83536;
      color: #fff;
    }
    
`