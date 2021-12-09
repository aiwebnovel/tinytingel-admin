import React, { useState } from 'react';
import { Box, Avatar, Flex } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const Header = ({ onOpen }) => {
  const [isShow, SetShow] = useState(false);

  const HandleShow = () => {
    SetShow(!isShow);
  };

  return (
    <>
      <Box backgroundColor="#f9f9f9" padding="10px">
        <Flex
          justify={{ base: 'space-between', md: 'flex-end' }}
          align="center"
        >
          <HamburgerIcon
            boxSize={6}
            onClick={onOpen}
            display={{ base: 'block', md: 'none' }}
          />
          <Avatar
            name="user"
            src="/logo192.png"
            size="md"
            onClick={HandleShow}
          />
        </Flex>
      </Box>
      {isShow && (
        <div>
            <p>Admin 님</p>
        </div>
      )}
    </>
  );
};

export default Header;
