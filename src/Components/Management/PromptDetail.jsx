import React, { useEffect, useState, useRef } from 'react';
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

import * as server from 'config/Config';

const Container = styled(Box)`
  background-color: #fff;
  border: 1px solid #444;
  padding: 30px 20px;
  max-width: 900px;
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
  background-color: #444;
  border: 1px solid #444;
  border-radius: 5px;
  color: #fff;
  padding: 2px 25px;
  transition: all 300ms ease;

  &:hover {
    background-color:  #0098FA;
    border: 1px solid #0098FA;
    // color: #444;
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
  const admin = JSON.parse(localStorage.getItem('admin'));
  const toast = useToast();
  const navigate = useNavigate();
  const cursor = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams();

  const [isModify, setModify] = useState(false);
  const [prompts, setprompt] = useState({
    admin_uid: '',
    frequency_penalty: '',
    max_tokens: '',
    model: '',
    name: '',
    presence_penalty: '',
    temperature: '',
    text: '',
  });

  const [stop_sequence, setStop] = useState('');

  const {
    admin_uid,
    frequency_penalty,
    max_tokens,
    model,
    name,
    presence_penalty,
    temperature,
    text,
  } = prompts;

  const addText = () => {
    //.log(cursor, cursor.current.selectionStart);
    let textValue = cursor.current.value;
    const cursorStart = cursor.current.selectionStart;

    const startValue = textValue.substring(cursorStart, 0);
    const endValue = textValue.substring(cursorStart);
   // console.log(startValue);
   // console.log(endValue);

    cursor.current.value = startValue + `{}` + endValue;
  };

  const DeletePrompt = async() => {
    const adminState = admin.adminState;

    await axios
      .delete(
        `${server.SERVER_URL}/prompt/${id}`,
        {
          headers: { Authorization: `Bearer ${adminState.token}` },
        }
      )
      .then(response => {
        console.log(response);
        navigate('/prompts');
        setTimeout( 
              toast({
              title: '성공',
              description: '삭제 되었습니다!',
              position: 'top-right',
              status: 'success',
              duration: 5000,
              isClosable: true,
            }), 5000);
          
      })
      .catch(error => {
        console.log(error.response);
        toast({
          title: 'error!',
          description: `${error.message}`,
          position: 'top-right',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
   }
 
  const ModifyPrompt = () => {
    const adminState = admin.adminState;
    const isBlank = Object.values(prompts);
    const sq = stop_sequence.split(',');

    if (isBlank.includes('') === true) {
      toast({
        title: '빈 칸이 남아 있습니다.',
        description: '빈 칸을 모두 채워주세요!',
        position: 'top-right',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {

      //console.log('modifyPrompt');
      const config = {
        method: 'put',
        url: `${server.SERVER_URL}/prompt/${id}`,
        headers: { Authorization: `Bearer ${adminState.token}` },
        data: {
          name: name,
          text: text,
          max_tokens: Number(max_tokens),
          temperature: Number(temperature),
          frequency_penalty: Number(frequency_penalty),
          presence_penalty: Number(presence_penalty),
          stop_sequence: sq,
          model: model,
        },
      };

      axios(config)
        .then(response => {
          console.log(response);
          // navigate(0);
       
            toast({
            title: '성공',
            description: '수정 되었습니다!',
            position: 'top-right',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const SettingModify = () => {
    console.log('setting modify');
    setModify(true);
  };

  const ChangePrompt = e => {
   // console.log(e.target.name, e.target.value);
    setprompt({ ...prompts, [e.target.name]: e.target.value });
  };

  const ChangeStop = e => {
    setStop(e.target.value);
  };

  const fetchData = async () => {
    const adminState = admin.adminState;

    await axios
      .get(`${server.SERVER_URL}/prompt/list?page=${1}&count=${30}`, {
        headers: { Authorization: `Bearer ${adminState.token}` },
      })
      .then(response => {
        console.log(response);
        const list = response.data.data;
        const prompt = list.find(item => item.uid === id);
        console.log(prompt);
        console.log(prompt.stop_sequence)
        setprompt({
          ...prompt,
          admin_uid: prompt.admin_uid,
          create_at: prompt.create_at,
          frequency_penalty: prompt.frequency_penalty,
          max_tokens: prompt.max_tokens,
          model: prompt.model,
          name: prompt.name,
          presence_penalty: prompt.presence_penalty,
          temperature: prompt.temperature,
          text: prompt.text,
          update_at: prompt.update_at,
        });
        setStop(prompt.stop_sequence);
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 412) {
          navigate('/', { replace: true });
          localStorage.clear();
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
            <input
              type="text"
              id="name"
              name="name"
              disabled={isModify ? false : true}
              value={name}
              onChange={ChangePrompt}
            />
          </Flex>
          <Flex w="100%" direction={'column'} className="makePromtLabelInput">
            <label htmlFor="writer">작성자</label>
            <input
              type="text"
              id="writer"
              name="admin_uid"
              disabled={isModify ? false : true}
              value={admin_uid}
              onChange={ChangePrompt}
            />
          </Flex>
          <Flex w="100%" direction={'column'} className="makePromtLabelInput">
            <label htmlFor="engine">engine</label>
            <input
              type="text"
              htmlFor="engine"
              name="model"
              disabled={isModify ? false : true}
              value={model}
              onChange={ChangePrompt}
            />
          </Flex>
          <Flex
            w="100%"
            direction={'column'}
            className="makePromtLabelTextarea"
          >
            <label htmlFor="prompt">prompt </label>
            <TextareaBox>
              <textarea
                id="prompt"
                name="text"
                disabled={isModify ? false : true}
                value={text}
                onChange={ChangePrompt}
                ref={cursor}
              />
              {isModify && (
                <ButtonBox>
                  <Button onClick={addText}>사용자 입력부분</Button>
                </ButtonBox>
              )}
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
              name="stop_sequence"
              disabled={isModify ? false : true}
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
                type="text"
                id="temperature"
                name='temperature'
                disabled={isModify ? false : true}
                value={temperature}
                onChange={ChangePrompt}
              />
            </Flex>
            <Flex
              w="100%"
              direction={'column'}
              className="makePromtLabelInputTwo"
            >
              <label htmlFor="max_tokens">max_tokens</label>
              <input
                type="text"
                id="max_tokens"
                name="max_tokens"
                disabled={isModify ? false : true}
                value={max_tokens}
                onChange={ChangePrompt}
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
              <label htmlFor="presence_penalty">presence_penalty</label>
              <input
                type="text"
                id="presence_penalty"
                name="presence_penalty"
                disabled={isModify ? false : true}
                value={presence_penalty}
                onChange={ChangePrompt}
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
                name="frequency_penalty"
                disabled={isModify ? false : true}
                value={frequency_penalty}
                onChange={ChangePrompt}
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
            <CancelBtn onClick={isModify ? ModifyPrompt : SettingModify}>
              {isModify ? '수정완료' : '수정'}
            </CancelBtn>
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
