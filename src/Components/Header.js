import React from 'react';
import {
  Box,
  Avatar,
  Flex
} from '@chakra-ui/react';
import {HamburgerIcon} from '@chakra-ui/icons'

const Header = ({onOpen}) => {
    return(
        <Box backgroundColor='#f9f9f9'padding='10px'>
            <Flex justify='space-between' align='center'>
            <HamburgerIcon boxSize={6} onClick={onOpen}/>
            <Avatar name='user' src='/logo192.png' size='md'/>
            </Flex>
        </Box>
    )
}

export default Header;