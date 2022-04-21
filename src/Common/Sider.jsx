import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, VStack,Flex, Avatar } from '@chakra-ui/react';
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

const LogOut = styled.button`
  background-color: #ff5a52;
  border-radius: 5px;
  color: #fff;
  padding: 5px 10px;
  transition: all 300ms ease;

  &:hover {
    background-color: #d83536;
    color: #fff;
  }
`;


const AvatarBox = styled(Box)`
  > h4 {
    font-weight : 600;
    font-size: 17px;
  }

`

const Sider = () => {
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  
  const admin = JSON.parse(localStorage.getItem('admin'));

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
      boxShadow='rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px'
     
    >
      <VStack w="100%" spacing="15px">
        <Flex
        w='100%'
        justify={'space-between'}
        align='center'
        borderBottom={'1px solid #f3f3f3'}
        padding="30px 18px 20px"
        mb='25px'
        >
            <Avatar
            bg='#b8c6db'
            name="user"
            size="md"
            style={{cursor:'pointer'}}
          />
          <AvatarBox>
            <h4>{admin && admin.adminState.name}</h4>
            <p>라이팅젤 관리자</p>
          </AvatarBox>
        </Flex>
        <Flex w="100%" direction="column" align="baseline" className="nav">
          <Link to="/">
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
      <Box textAlign={'center'} mb='20px'>
        <LogOut onClick={AdminLogOut}>Logout</LogOut>
      </Box>
    </Box>
  );
};

export default Sider;

