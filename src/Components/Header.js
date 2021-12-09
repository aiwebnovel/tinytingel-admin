import React, { useState } from 'react';
import { Box, Avatar, Flex, Divider } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import "../styles/style.scss";

const Header = ({ onOpen }) => {
  const [isShow, SetShow] = useState(false);

  const HandleShow = () => {
    SetShow(!isShow);
  };

  return (
    <>
      <Box backgroundColor="#f5f7fa" padding="10px">
        <Flex
          justify={{ base: 'space-between', md: 'flex-end' }}
          align="center"
        >
          <HamburgerIcon
            boxSize={6}
            onClick={onOpen}
            display={{ base: 'block', md: 'none' }}
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
          <p>Admin 님</p>
          <Divider/>
          <p>ADMIN</p>
          <button>로그아웃</button>
        </Box>
      )}
    </>
  );
};

export default Header;
