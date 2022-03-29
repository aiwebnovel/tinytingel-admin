import React, { useState } from 'react';
import { Box, Avatar, Flex, Divider } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import "../styles/style.scss";

const Header = ({ onOpen }) => {

  const admin = JSON.parse(localStorage.getItem('admin'));
  const adminState = admin.adminState;
  const [isShow, SetShow] = useState(false);

  const HandleShow = () => {
    SetShow(!isShow);
  };

  const AdminLogOut = () => {
    localStorage.clear();
    window.location.replace('/');
  }

  return (
    <>
      <Box backgroundColor="#f5f7fa" padding="10px">
        <Flex
          justify={{ base: 'space-between', lg: 'flex-end' }}
          align="center"
        >
          <HamburgerIcon
            boxSize={6}
            onClick={onOpen}
            display={{ base: 'block', lg: 'none' }}
            style={{cursor:'pointer'}}
          />
          <Avatar
            bg='#b8c6db'
            name="user"
            size="md"
            style={{cursor:'pointer'}}
            onClick={HandleShow}
          />
        </Flex>
      </Box>
      {isShow && (
        <Box
          bg="#fff"
          position="absolute"
          top="70px"
          right="0px"
          className="UserProfile"
        >
          <h4>{adminState.name}</h4>
          <p>라이팅젤 관리자</p>
          <button onClick={AdminLogOut}>로그아웃</button>
        </Box>
      )}
    </>
  );
};

export default Header;
