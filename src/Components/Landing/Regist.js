import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Text
} from '@chakra-ui/react';
import styled from 'styled-components';

const Regist = () => {
  return (
    <LandingBox minH='100vh' display="flex" justifyContent="center" alignItems="center">
      <FormBox bg='#fff' padding='48px' borderRadius='15px'>
      <Box>
          <Text fontSize='3xl' textAlign='center' fontWeight='600' marginBottom='30px'>가입하기</Text>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input type="email" />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Password</FormLabel>
          <Input type="email" />
          <FormHelperText>We'll never share your email and password.</FormHelperText>
        </FormControl>
        </Box>
        <Box textAlign='center' marginTop='30px'>
        <RegistBtn>회원가입</RegistBtn>
        </Box>
      </FormBox>
    </LandingBox>
  );
};

export default Regist;

const LandingBox = styled(Box)`
  background-color: #b8c6db;
  background-image: linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%);

  @media screen and (max-width: 768px) {
      padding : 0 15px;
  }

`;

const FormBox = styled(Box)`
    box-shadow : rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`

const RegistBtn = styled.button`

  background-color : #b8c6db;
  border: 1px solid #b8c6db;
  border-radius : 10px;
  color: #f3f3f3;
  padding: 5px 8px;
  width: 100%;
`