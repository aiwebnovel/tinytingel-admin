import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Flex,
  useToast,
  useDisclosure,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import Layout from 'Common/Layout.jsx';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {Back} from 'styles/ComponentStyle';
import * as server from 'config/Config';
import {BtnBox} from 'styles/ComponentStyle';

const ModifyOpen = styled.button`
  background-color: #444;
  padding: 2px 15px;
  border: 1px solid #444;
  border-radius: 5px;
  color: #fff;
  transition: all 300ms ease;

  &:hover {
    background-color: #0098fa;
    border: 1px solid #0098fa;
  }
`;

const ModifyBtn = styled.button`
  background-color: #444;
  border: 1px solid #444;
  border-radius: 5px;
  color: #fff;
  padding: 2px 25px;
  transition: all 300ms ease;

  &:hover {
    background-color: #0098fa;
    border: 1px solid #0098fa;
    // color: #444;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const CancelBtn = styled.button`
  background-color: #ff5a52;
  border-radius: 5px;
  color: #fff;
  padding: 2px 25px;
  transition: all 300ms ease;

  &:hover {
    background-color: #d83536;
    color: #fff;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const QuestionDetail = () => {
  const admin = JSON.parse(localStorage.getItem('admin'));
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const { id } = useParams();

  const [inquiry, setInquiry] = useState('');
  const [statusChecked, setStatusChecekd] = useState([false, false, false]);
  const [checkedValue, setCheckedValue] = useState('');

  const ChangeCheckedValue = e => {
    setCheckedValue(e.target.value);
  };
  const ModifyStatus = () => {
    const status = inquiry.status;
    console.log(checkedValue, status);
    if (!checkedValue) {
      toast({
        title: '??????????????? ???????????? ???????????????.',
        description: '????????? ????????? ??????????????????!',
        position: 'top-right',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    if (checkedValue && checkedValue !== status) {
      const config = {
        method: 'put',
        url: `${server.SERVER_URL}/inquiry/${id}?status=${checkedValue}`,
        headers: { Authorization: `Bearer ${admin.adminState.token}` },
      };

      axios(config)
        .then(response => {
          navigate('/questions');
          setTimeout(
            toast({
              title: '?????? ??????!',
              description: '?????? ????????? ?????????????????????.',
              position: 'top-right',
              status: 'success',
              duration: 5000,
              isClosable: true,
            }),
            5000
          );
        })
        .catch(error => {
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
        });
    }
  };

  const fetchData = () => {
    const config = {
      method: 'post',
      url: `${server.SERVER_URL}/inquiry/list/search`,
      headers: { Authorization: `Bearer ${admin.adminState.token}` },
      data: {
        page: 1,
        count: 1000,
      },
    };

    axios(config)
      .then(response => {
        // console.log(response);
        const data = response.data.data;

        const FilterData = data.filter(item => item.inquiry_uid === Number(id));
        const inquiry = FilterData[0];
        const status = inquiry.status;

        if (status === 'answered') {
          setStatusChecekd([true, false, false]);
        }
        if (status === 'checked') {
          setStatusChecekd([false, true, false]);
        }

        if (status === 'unchecked') {
          setStatusChecekd([false, false, true]);
        }

        setInquiry(inquiry);
      })
      .catch(error => {
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
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <Box className="QuestionContainer">
        <Box maxW="1200px" m="0 auto">
          <div className="QuestionBox">
            <h4>?????????</h4>
            <p>{inquiry.name}</p>
          </div>
          <div className="QuestionBox">
            <h4>?????????</h4>
            <p>{inquiry.email}</p>
          </div>
          <div className="QuestionBox">
            <h4>?????? ??????</h4>
            <p>{inquiry.category}</p>
          </div>
          <div className="QuestionBox">
            <h4>?????? ??????</h4>
            <p>{inquiry.title}</p>
          </div>
          <div className="QuestionBox" style={{ minHeight: '200px' }}>
            <h4>?????? ??????</h4>
            <p>{inquiry.content}</p>
          </div>
          <div className="QuestionBox">
            <h4>??????</h4>
            <Flex direction={{ base: 'column', sm: 'row' }} gridGap="15px">
              <label htmlFor="answered" className="QuestionLabel">
                <input
                  type="checkbox"
                  value="answered"
                  id="answered"
                  checked={statusChecked[0]}
                  onChange={e => {
                    setStatusChecekd([true, false, false]);
                    ChangeCheckedValue(e);
                  }}
                />
                ?????? ??????
              </label>
              <label htmlFor="checked" className="QuestionLabel">
                <input
                  type="checkbox"
                  value="checked"
                  id="checked"
                  checked={statusChecked[1]}
                  onChange={e => {
                    setStatusChecekd([false, true, false]);
                    ChangeCheckedValue(e);
                  }}
                />
                ??????
              </label>
              <label htmlFor="unchecked" className="QuestionLabel">
                <input
                  type="checkbox"
                  value="unchecked"
                  id="unchecked"
                  checked={statusChecked[2]}
                  onChange={e => {
                    setStatusChecekd([false, false, true]);
                    ChangeCheckedValue(e);
                  }}
                />
                ?????????
              </label>
            </Flex>
          </div>

          <BtnBox>
            <Back onClick={() => navigate(-1)}>?????? ??????</Back>
            <ModifyOpen onClick={onOpen}>??????</ModifyOpen>
          </BtnBox>
        </Box>
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
            ?????? ????????? ?????????????????????????
          </ModalBody>
          <ModalFooter justifyContent={'center'}>
            <HStack>
              <ModifyBtn onClick={ModifyStatus}>??????</ModifyBtn>
              <CancelBtn onClick={onClose}>??????</CancelBtn>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
};

export default QuestionDetail;
