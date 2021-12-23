import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Text,
  useToast
} from '@chakra-ui/react';
import axios from 'axios';
import styled from 'styled-components';

const Landing = () => {

  const [Inputs, SetInputs] = useState({
    userId:'',
    userPassword : ''
  })

  const toast = useToast();

  const  {userId, userPassword} = Inputs;

  const ChangeInput = (e) => {
    console.log(e.target.value);
    SetInputs({...Inputs, [e.target.name] : e.target.value});
  }

  const GoLogin = () => {
    console.log('login');
    const config = {
      method: "post",
      url:'https://veryshort.best:5051/api/v1/admin/login',
      data: {
        id:userId,
        password:userPassword
    }
    }

    axios(config)
    .then(async(res)=>{
      console.log(res)
      toast({
        title: '로그인 성공!',
        description: "로그인에 성공했습니다!",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    })
    .catch((error)=>{
      console.log(error)
      toast({
        title: '로그인 실패!',
        description: "혹시 빈 칸이 있나요? 혹은 가입하지 않은 유저신가요?",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    })
  };

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
            <Input type="email" name='email' onChange={ChangeInput} />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Password</FormLabel>
            <Input type="password" name='password'  onChange={ChangeInput}/>
            <FormHelperText>
              We'll never share your email and password.
            </FormHelperText>
          </FormControl>
        </Box>
        <Box textAlign="center" marginTop="30px">
          <LoginBtn onClick={GoLogin}>로그인</LoginBtn>
        </Box>
        {/* <Box textAlign='center' marginTop='30px'>
          <Text fontSize='sm'>아직 회원이 아니신가요?</Text>
          <Divider margin='5px 0'/>
          <Link to='/regist' style={{textDecoration:'underline'}}>회원가입</Link>
        </Box> */}
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
  background-color: #b8c6db;
  border: 1px solid #b8c6db;

  border-radius: 10px;
  color: #f3f3f3;
  padding: 5px 8px;
  width: 100%;

  transition: all 300ms ease;

  &:hover {
    background-color: #e6f4f1;
    border: 1px solid #e6f4f1;
    color: #444;
  }
`;
