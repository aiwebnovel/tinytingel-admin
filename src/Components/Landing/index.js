import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Text,
  Divider,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Landing = () => {
  return (
    <LandingBox
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <FormBox bg="#fff" borderRadius="15px">
        <Text
          fontSize="4xl"
          textAlign="center"
          fontWeight="600"
          marginBottom="30px"
        >
          ADMIN LOGIN
        </Text>
        <Box>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Password</FormLabel>
            <Input type="email" />
            <FormHelperText>
              We'll never share your email and password.
            </FormHelperText>
          </FormControl>
        </Box>
        <Box textAlign='center' marginTop='30px'>
        <LoginBtn>로그인</LoginBtn>
        </Box>
        <Box textAlign='center' marginTop='30px'>
          <Text fontSize='sm'>아직 회원이 아니신가요?</Text>
          <Divider margin='5px 0'/>
          <Link to='/regist' style={{textDecoration:'underline'}}>회원가입</Link>
        </Box>
      </FormBox>
    </LandingBox>
  );
};

export default Landing;

const LandingBox = styled(Box)`
  background-color: #b8c6db;
  background-image: linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%);

  @media screen and (max-width: 768px) {
    padding: 0 15px;
  }
`;

const FormBox = styled(Box)`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  
  padding: 48px;
  
  @media screen and (max-width: 768px) {
    padding: 48px 24px;
  }

`;

const LoginBtn = styled.button`

  background-color : #b8c6db;
  border: 1px solid #b8c6db;
  border-radius : 10px;
  color: #f3f3f3;
  padding: 5px 8px;
  width: 100%;
`