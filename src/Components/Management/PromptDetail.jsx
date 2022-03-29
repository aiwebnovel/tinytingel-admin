import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  HStack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from 'Common/Layout';
import styled from 'styled-components';

import * as config from 'config/Config';

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

const DeleteBtn = styled.button`
  background-color: #ff5a52;
  //border: 1px solid #FF5A52;
  border-radius: 5px;
  color: #fff;
  padding: 2px 25px;
  transition: all 300ms ease;

  &:hover {
    background-color: #d83536;
    //border: 1px solid #D83536;
    color: #fff;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const PromptDetail = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { id } = useParams();
  console.log(id);

  const [prompts, setprompt] = useState({
    admin_uid: '',
    frequency_penalty: '',
    max_tokens: '',
    model: '',
    name: '',
    presence_penalty: '',
    stop_sequence: '',
    temperature: '',
    text: '',
  });

  const {
    admin_uid,
    frequency_penalty,
    max_tokens,
    model,
    name,
    presence_penalty,
    stop_sequence,
    temperature,
    text,
  } = prompts;

  const DeletePrompt = () => {
    console.log('delete')
  }


  const fetchData = async () => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    const adminState = admin.adminState;

    await axios
      .get(`${config.SERVER_URL}/prompt/list?page=${1}&count=${30}`, {
        headers: { Authorization: `Bearer ${adminState.token}` },
      })
      .then(response => {
        console.log(response);
        const list = response.data.data;
        const prompt = list.find(item => item.uid === id);
        console.log(prompt);
        setprompt({
          ...prompt,
          admin_uid: prompt.admin_uid,
          create_at: prompt.create_at,
          frequency_penalty: prompt.frequency_penalty,
          max_tokens: prompt.max_tokens,
          model: prompt.model,
          name: prompt.name,
          presence_penalty: prompt.presence_penalty,
          stop_sequence: prompt.stop_sequence,
          temperature: prompt.temperature,
          text: prompt.text,
          update_at: prompt.update_at,
        });
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 412) {
          localStorage.clear();
          navigate('/', {replace:true});
          setTimeout(
            toast({
              title: '토큰이 만료됐습니다.',
              description: '새로 로그인 해주세요!',
              position: 'top-right',
              status: 'error',
              duration: 5000,
              isClosable: true,
            }),
            5000
          );
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <Box padding="48px">
        <Container>
          <Flex w="100%" direction={'column'} className="makePromtLabelInput">
            <label htmlFor="name">서비스명</label>
            <input type="text" id="name" disabled value={name} />
          </Flex>
          <Flex w="100%" direction={'column'} className="makePromtLabelInput">
            <label htmlFor="writer">작성자</label>
            <input type="text" id="writer" disabled value={admin_uid} />
          </Flex>
          <Flex w="100%" direction={'column'} className="makePromtLabelInput">
            <label htmlFor="engine">engine</label>
            <input type="text" htmlFor="engine" disabled value={model} />
          </Flex>
          <Flex
            w="100%"
            direction={'column'}
            className="makePromtLabelTextarea"
          >
            <label htmlFor="prompt">prompt </label>
            <TextareaBox>
              <textarea id="prompt" disabled value={text} />
              {/* <ButtonBox>
                <Button>사용자 입력부분</Button>
              </ButtonBox> */}
            </TextareaBox>
          </Flex>
          <Flex
            w="100%"
            direction={'column'}
            className="makePromtLabelTextarea"
          >
            <label htmlFor="stop_sequence">stop_sequence</label>
            <textarea id="stop_sequence" disabled value={stop_sequence} />
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
                type="text"
                id="temperature"
                disabled
                value={temperature}
              />
            </Flex>
            <Flex
              w="100%"
              direction={'column'}
              className="makePromtLabelInputTwo"
            >
              <label htmlFor="max_tokens">max_tokens</label>
              <input type="text" id="max_tokens" disabled value={max_tokens} />
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
              <label htmlFor="presence_penalty">presence_penalty</label>
              <input
                type="text"
                id="presence_penalty"
                disabled
                value={presence_penalty}
              />
            </Flex>
            <Flex
              w="100%"
              direction={'column'}
              className="makePromtLabelInputTwo"
            >
              <label htmlFor="frequency_penalty">frequency_penalty</label>
              <input
                type="text"
                id="frequency_penalty"
                disabled
                value={frequency_penalty}
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
            <CancelBtn>수정</CancelBtn>
            <DeleteBtn onClick={onOpen}>삭제</DeleteBtn>
          </Flex>
        </Container>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>

          <ModalBody
            textAlign={'center'}
            fontSize="1.2rem"
            fontWeight={600}
            padding="20px 24px 10px"
          >
            삭제하시겠습니까?
          </ModalBody>
          <ModalFooter justifyContent={'center'}>
            <HStack>
              <DeleteBtn onClick={DeletePrompt}>삭제</DeleteBtn>
              <CancelBtn onClick={onClose}>취소</CancelBtn>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
};

export default PromptDetail;
