import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import Header from 'Components/Header';
import {
  Box,
  Heading,
  useDisclosure,
  VStack,
  CloseButton,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Avatar,
} from '@chakra-ui/react';
import {
  FcHome,
  FcAssistant,
  FcConferenceCall,
  FcCommandLine,
} from 'react-icons/fc';
import Sider from './Sider.jsx';
import styled from 'styled-components';

const HomeLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const AvatarBox = styled(Box)`
  > h4 {
    font-weight: 600;
    font-size: 17px;
  }
`;

const Layout = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem('admin'));
  const { isOpen, onOpen, onClose } = useDisclosure();

  const AdminLogOut = () => {
    localStorage.clear();
    window.location.replace('/');
  };

    useEffect(()=> {
    if(admin === null) {
      window.location.replace('/')
    }
  })

  return (
    <Box minH="100vh">
      <Sider />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent>
          <Box
            transition="300ms ease"
            bg="white"
            borderRight="1px"
            borderRightColor="gray.300"
            w="full"
            pos="fixed"
            h="full"
            paddingTop={{ base: '0' }}
            backgroundColor="#fff"
            overflow={'auto'}
          >
            <Flex
              justify="space-between"
              padding="10px"
              bg="#f9f9f9"
              className="MobileNavTop"
            >
              <CloseButton onClick={onClose} />
              <button onClick={AdminLogOut}>Logout</button>
            </Flex>
            <Flex
              w="100%"
              gridGap={'20px'}
              align="center"
              borderBottom={'1px solid #f3f3f3'}
              padding="20px 18px"
              mb="10px"
            >
              <Avatar
                bg="#b8c6db"
                name="user"
                size="md"
                style={{ cursor: 'pointer' }}
              />
              <AvatarBox>
                <h4>{admin && admin.adminState.name}</h4>
                <p>라이팅젤 관리자</p>
              </AvatarBox>
            </Flex>
            <VStack spacing="20px" align="flex-start">
              <Flex direction="column" align="baseline" className="MobileNav">
                <Heading as="h4" size="md" margin="20px 0">
                  <HomeLink to="/">
                    {' '}
                    <FcHome /> Home
                  </HomeLink>
                </Heading>
                <Heading as="h4" size="md" marginBottom="10px">
                  <FcConferenceCall />
                  회원관리
                </Heading>
                <Link to="/members">회원 현황 조회</Link>
                <Link to="/paymentlog">결제 현황 조회</Link>
                <Link to="/loginlog">로그인 기록 조회</Link>
              </Flex>
              <Flex direction="column" align="baseline" className="MobileNav">
                <Heading as="h4" size="md" marginBottom="10px">
                  <FcAssistant />
                  문의사항 관리
                </Heading>
                <Link to="/questions">문의사항 조회</Link>
              </Flex>

              <Flex direction="column" align="baseline" className="MobileNav">
                <Heading as="h4" size="md" marginBottom="10px">
                  <FcCommandLine />
                  프롬프트 관리
                </Heading>
                <Link to="/prompts">프롬프트 관리</Link>
              </Flex>
            </VStack>
          </Box>
        </DrawerContent>
      </Drawer>
      <Header onOpen={onOpen} />

      <Box
        backgroundColor="#f5f7fa"
        minH="100vh"
        marginLeft={{ base: '0', lg: '220px' }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
