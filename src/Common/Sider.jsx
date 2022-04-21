import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, VStack, Heading, Flex, HStack } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  FcHome,
  FcConferenceCall,
  FcAssistant,
  FcCommandLine,
} from 'react-icons/fc';
import '../styles/style.scss';
import styled from 'styled-components';

const Headings = styled.h3`
  margin-bottom: 5px;
  font-size: 1rem;
  font-weight: 600;

  display: flex;
  align-items: center;
  gap: 5px;
`;

const Sider = () => {
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  

  const AdminLogOut = () => {
    localStorage.clear();
    window.location.replace('/');
  };

  return (
    <Box
      transition="300ms ease"
      w={{ base: 'full', lg: '220px' }}
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      pos="fixed"
      top={0}
      h="full"
      bg="#fff"
      display={{ base: 'none', lg: 'flex' }}
      // boxShadow="rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;"
      boxShadow='rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px'
      padding="30px 0"
    >
      <VStack w="100%" spacing="15px">
        <Heading
          as="h3"
          size="lg"
          w="100%"
          textAlign={'center'}
          mb='40px'
        >
          ADMIN
        </Heading>
        <Flex w="100%" direction="column" align="baseline" className="nav">
          <Link to="/home">
            <Headings mb="10px">
              <FcHome />
              HOME
            </Headings>
          </Link>
        </Flex>
        <Flex w="100%" direction="column" align="baseline" className="nav">
          <Headings id="toggle1" onClick={()=>{setToggle1(!toggle1)}}>
            <FcConferenceCall />
            회원관리
            <ChevronDownIcon />
          </Headings>
          <ul className={toggle1 ? 'toogleTrue' : 'toogleFalse'}>
            <Link to="/members">
              <li>회원 현황 조회</li>
            </Link>
            <Link to="/paymentlog">
              <li>결제 현황 조회</li>
            </Link>
            <Link to="/loginlog">
              <li>로그인 기록 조회</li>
            </Link>
          </ul>
        </Flex>
        <Flex w="100%" direction="column" align="baseline" className="nav">
          <Headings id="toggle2"onClick={()=>{setToggle2(!toggle2)}}>
            <FcAssistant />
            문의사항 관리
            <ChevronDownIcon />
          </Headings>
          <ul  className={toggle2 ? 'toogleTrue' : 'toogleFalse'}>
            <Link to="/questions">
              <li>문의사항 조회</li>
            </Link>
          </ul>
        </Flex>
        <Flex w="100%" direction="column" align="baseline" className="nav">
          <Headings id="toggle3" onClick={()=>{setToggle3(!toggle3)}}>
            <FcCommandLine />
            프롬프트 관리
            <ChevronDownIcon />
          </Headings>
          <ul className={toggle3 ? 'toogleTrue' : 'toogleFalse'}>
            <Link to="/prompts">
              <li>프롬프트 관리</li>
            </Link>
          </ul>
        </Flex>
      </VStack>
      <HStack spacing="25px">
        <LogOut onClick={AdminLogOut}>Logout</LogOut>
      </HStack>
    </Box>
  );
};

export default Sider;

const LogOut = styled.button`
  background-color: #ff5a52;
  //border: 1px solid #FF5A52;
  border-radius: 5px;
  color: #fff;
  padding: 5px 10px;
  transition: all 300ms ease;

  &:hover {
    background-color: #d83536;
    //border: 1px solid #D83536;
    color: #fff;
  }
`;
