import React from 'react';
import { Box, Flex} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import "../styles/style.scss";

const Header = ({ onOpen }) => {

  return (
      <Box backgroundColor="#f5f7fa" padding="20px">
        <Flex
          justify={{ base: 'space-between', lg: 'flex-end' }}
          align="center"
        >
          <HamburgerIcon
            boxSize={7}
            onClick={onOpen}
            display={{ base: 'block', lg: 'none' }}
            style={{cursor:'pointer'}}
          />
        </Flex>
      </Box>
  );
};

export default Header;
