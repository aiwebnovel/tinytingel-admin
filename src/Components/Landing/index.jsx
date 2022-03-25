import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Text,
  useToast
} from '@chakra-ui/react';
import axios from 'axios';
import styled from 'styled-components';
import { adminState } from '../../config/Recoil';
import { useSetRecoilState } from 'recoil';
import * as server from '../../config/Config';

const Landing = () => {

  const toast = useToast();
  const setAdminState = useSetRecoilState(adminState);
  const [Inputs, SetInputs] = useState({
    userId:'',
    userPassword : ''
  })

  const  {userId, userPassword} = Inputs;

  const ChangeInput = (e) => {
    console.log(e.target.value);
    SetInputs({...Inputs, [e.target.name] : e.target.value});

    // console.log(userId, userPassword);
  }

  const GoLogin = (e) => {
    e.preventDefault();

    axios.post(`${server.SERVER_URL}/login`, {
        id:userId,
        password:userPassword
    })
    .then(async(res)=>{
      // console.log(res);
      const token = res.data.data.token;
     
      await axios.get(`${server.SERVER_URL}/profile`,{
        headers: {Authorization: `Bearer ${token}`}
      })
      .then((response)=>{
        console.log(response);
        const data = response.data.data;

        setAdminState({
          ...adminState,
          token:token,
          id:data.id,
          name:data.name,
          admin_uid:data.admin_uid,
          is_root:data.is_root,
          login_at: data.login_at,
          create_at: data.create_at,
          update_at: data.update_at,
          delete_at: data.delete_at
        });

        toast({
          title: '로그인 성공!',
          description: "로그인에 성공했습니다!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      })
      .catch((error)=>{
        console.log(error);
        toast({
          title: '프로필을 가져오지 못했습니다',
          description: "유저 프로필을 가져오지 못했습니다.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
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
        <Flex
        direction={'column'}
        align='center'
        justify={'center'}
        marginBottom='30px'
        >
          <Img src='/logo2.png' alt='로고'/>
        </Flex>
        <form>
        <Box>
          <FormControl id="email" style={{marginBottom: '10px'}}>
            <FormLabel>ADMIN EMAIL</FormLabel>
            <Input type="email" name='userId' onChange={ChangeInput} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>ADMIN PASSWORD</FormLabel>
            <Input type="password" name='userPassword'  onChange={ChangeInput}/>
            <FormHelperText>
              We'll never share your email and password.
            </FormHelperText>
          </FormControl>
        </Box>
        <Box textAlign="center" marginTop="30px">
          <LoginBtn type='submit' onClick={GoLogin} >로그인</LoginBtn>
        </Box>
        </form>
      </FormBox>
    </LandingBox>
  );
};

export default Landing;

const LandingBox = styled(Box)`
  background-color: #b1b5e6;
  background-image: linear-gradient(315deg, #b1b5e6 0%, #f5f7fa 74%);

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
  background-color: #b1b5e6;
  border: 1px solid #b1b5e6;

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

const Img = styled.img`
  width: 150px;
`