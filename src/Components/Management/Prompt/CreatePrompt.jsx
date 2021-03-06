import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Flex, Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import Layout from 'Common/Layout';
import styled from 'styled-components';

import * as server from 'config/Config';

const Container = styled(Box)`
  background-color: #fff;
  border: 1px solid #444;
  padding: 30px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const TextareaBox = styled(Box)`
  width: 100%;
  //max-width: 800px;
  border: 1px solid #444;
`;

const ButtonBox = styled(Box)`
  width: 100%;
  background-color: #f9f9f9;
  padding: 10px;
`;

const CancelBtn = styled.button`
  background-color: #fff;
  border: 1px solid #444;
  border-radius: 5px;
  color: #444;
  padding: 2px 25px;
  transition: all 300ms ease;

  &:hover {
    background-color: #444;
    //border: 1px solid #444;
    color: #fff;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const ResetBtn = styled.button`
  background-color: #e2e8f0;
  border: 1px solid #444;
  border-radius: 5px;
  color: #444;
  padding: 2px 25px;
  transition: all 300ms ease;

  &:hover {
    background-color: #e6f4f1;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const CreatePropmt = () => {

  const toast = useToast();
  const admin = JSON.parse(localStorage.getItem('admin'));
  
  const cursor = useRef();
  const navigate = useNavigate();
  const [prompts, setPrompt] = useState({
    name: '',
    prompt: '',
    max_tokens: '',
    temperature: '',
    frequency_penalty: '',
    presence_penalty: '',
    model: '',
  });

  const [stop_sequence, setStop] = useState('')

  const {
    name,
    prompt,
    max_tokens,
    temperature,
    frequency_penalty,
    presence_penalty,
    model,
  } = prompts;

  const ChangeValues = e => {
    setPrompt({ ...prompts, [e.target.id]: e.target.value });
  };


  const ChangeStop = e => {
    setStop(e.target.value);
  }

  const MakePrompt = () => {
    const isBlank = Object.values(prompts);
    const sq = stop_sequence.split(',');
    //console.log(prompts, sq);

    if (isBlank.includes('') === true) {
      toast({
        title: '??? ?????? ?????? ????????????.',
        description: '??? ?????? ?????? ???????????????!',
        position: 'top-right',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }else {
      const adminState = admin.adminState;
      const config = {
        method: "post",
        url: `${server.SERVER_URL}/prompt`,
        headers: {Authorization: `Bearer ${adminState.token}` },
        data: {
         name:name,
         text:prompt,
         max_tokens: Number(max_tokens),
         temperature: Number(temperature),
         frequency_penalty: Number(frequency_penalty),
         presence_penalty: Number(presence_penalty),
         stop_sequence: sq,
         model:model
        },
      }
      axios(config)
      .then((response) => {
        navigate('/prompts');
        setTimeout( 
        toast({
          title: '??????!',
          description: '??????????????? ?????????????????????.',
          position: 'top-right',
          status: 'success',
          duration: 5000,
          isClosable: true,
        }),5000);
      })
      .catch((error)=>{
        console.log(error);
        if (error.response.status === 412) {
          localStorage.clear();
            toast({
              title: '????????? ??????????????????.',
              description: '?????? ????????? ????????????!',
              position: 'top-right',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
        }
      })
    }
  };

  const Reset = () => {
    setPrompt({
      ...prompts,
      name: '',
      prompt: '',
      max_token: '',
      temperature: '',
      stop_sequence: '',
      frequency_penalty: '',
      presence_penalty: '',
      model: '',
    });
  };

  const addText = () => {
  //console.log(cursor, cursor.current.selectionStart);  
  let textValue = cursor.current.value;
  const cursorStart = cursor.current.selectionStart;

  const startValue = textValue.substring(cursorStart,0);
  const endValue =  textValue.substring(cursorStart);
  //console.log(startValue);
  //console.log(endValue);

  cursor.current.value = startValue + `{}` + endValue;

  }

  return (

    <Layout>
      <Box padding="48px">
        <Container>
          <Flex w="100%" direction={'column'} className="makePromtLabelInput">
            <label htmlFor="name">????????????</label>
            <input type="text" id="name" value={name} onChange={ChangeValues} />
          </Flex>
          <Flex w="100%" direction={'column'} className="makePromtLabelInput">
            <label htmlFor="model">engine</label>
            <input
              type="text"
              id="model"
              value={model}
              onChange={ChangeValues}
            />
          </Flex>
          <Flex
            w="100%"
            direction={'column'}
            className="makePromtLabelTextarea"
          >
            <label htmlFor="prompt">prompt </label>
            <TextareaBox>
              <textarea id="prompt" value={prompt} onChange={ChangeValues} ref={cursor}/>
              <ButtonBox>
                <Button onClick={addText}>????????? ????????????</Button>
              </ButtonBox>
            </TextareaBox>
          </Flex>
          <Flex
            w="100%"
            direction={'column'}
            className="makePromtLabelTextarea"
          >
            <label htmlFor="stop_sequence">stop_sequence</label>
            <textarea
              id="stop_sequence"
              value={stop_sequence}
              onChange={ChangeStop}
            />
          </Flex>
          <Flex
            w="100%"
            gridGap={{ base: '0px', lg: '20px' }}
            direction={{ base: 'column', lg: 'row' }}
          >
            <Flex
              w="100%"
              direction={'column'}
              className="makePromtLabelInputTwo"
            >
              <label htmlFor="temperature">temperature</label>
              <input
                type="number"
                id="temperature"
                value={temperature}
                onChange={ChangeValues}
              />
            </Flex>
            <Flex
              w="100%"
              direction={'column'}
              className="makePromtLabelInputTwo"
            >
              <label htmlFor="max_tokens">max_tokens</label>
              <input
                 type="number"
                id="max_tokens"
                value={max_tokens}
                onChange={ChangeValues}
              />
            </Flex>
          </Flex>

          <Flex
            w="100%"
            gridGap={{ base: '0px', lg: '20px' }}
            direction={{ base: 'column', lg: 'row' }}
          >
            <Flex
              w="100%"
              direction={'column'}
              className="makePromtLabelInputTwo"
            >
              <label htmlFor="presence_penalty">presence_penalty</label>{' '}
              <input
                type="number"
                id="presence_penalty"
                value={presence_penalty}
                onChange={ChangeValues}
              />
            </Flex>
            <Flex
              w="100%"
              direction={'column'}
              className="makePromtLabelInputTwo"
            >
              <label htmlFor="frequency_penalty">frequency_penalty</label>
              <input
                 type="number"
                id="frequency_penalty"
                value={frequency_penalty}
                onChange={ChangeValues}
              />
            </Flex>
          </Flex>

          <Flex
            align={'center'}
            direction={{ base: 'column', sm: 'row' }}
            justify={{ base: 'center', sm: 'flex-end' }}
            mt="15px"
            gridGap={'15px'}
          >
            <CancelBtn onClick={MakePrompt}>??????</CancelBtn>
            <ResetBtn onClick={Reset}>????????????</ResetBtn>
          </Flex>
        </Container>
      </Box>
    </Layout>
  );
};

export default CreatePropmt;
