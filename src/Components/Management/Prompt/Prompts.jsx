import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Checkbox,
  Text,
  Flex,
  Tooltip,
  IconButton,
  useToast,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  PlusSquareIcon,
  DeleteIcon,
} from '@chakra-ui/icons';
import Layout from 'Common/Layout.jsx';
import styled from 'styled-components';
import moment from 'moment';
import { DeleteBtn,CancelBtn } from 'styles/ComponentStyle';

import * as config from 'config/Config';

const DetailBtn = styled.button`
  background-color: #0098fa;
  color: #fff;
  padding: 2px 10px;
  border-radius: 5px;
`;

const Prompts = () => {
  const admin = JSON.parse(localStorage.getItem('admin'));
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  //체크된 아이템
  const [checkedItems, setCheckedItems] = useState([]);
  //체크용 id 리스트
  const [idList, setIdList] = useState([]);
  //프롬프트 리스트
  const [List, setList] = useState([]);
  //현재 페이지
  const [currentPage, setCurrent] = useState(1);
  //페이지당 포스트 개수
  const [postPerPage, setPostPerPage] = useState(30);
  //최대 페이지
  const [maxPage, setMaxPage] = useState('');

  const isIndeterminate = checkedItems.some(Boolean);

  const CheckAll = e => {
    console.log(e.target.checked);
    setCheckedItems(e.target.checked ? idList : []);
    //console.log(checkedItems);
  };

  const CheckEach = (e,id) => {
    //console.log(e.target);
    if(e.target.checked) {
      setCheckedItems([...checkedItems, id])
    }
    else {
      setCheckedItems(checkedItems.filter((item)=> item !== id));
    }
  };

  const DeletePrompt = async() => {
   const checkedArray = idList.filter(item => checkedItems.includes(item))
   const adminState = admin.adminState;

   console.log(checkedArray)

  

 if(checkedArray.length === 0) {
    toast({
      title: '선택한 프롬프트가 없어요!',
      description: '삭제할 프롬프트를 선택해주세요.',
      position: 'top-right',
      status: 'info',
      duration: 5000,
      isClosable: true,
    })
   } 

   if(checkedArray.length === 1) {
    axios
    .delete(
      `${config.SERVER_URL}/prompt/${checkedArray[0]}`,
      {
        headers: { Authorization: `Bearer ${adminState.token}` },
      }
    )
    .then(response => {
      console.log(response);
      navigate(0);

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
   
   
   if(checkedArray.length > 1) {
      Promise.all(
        checkedArray.map(async param => {
          return await axios
          .delete(
            `${config.SERVER_URL}/prompt/${param}`,
            {
              headers: { Authorization: `Bearer ${adminState.token}` },
            }
          )
        } )
      )
      .then(response => {
        console.log(response);
        navigate(0);
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
}



  const fetchData = async () => {
    
    const adminState = admin.adminState;

    await axios
      .get(
        `${config.SERVER_URL}/prompt/list?page=${currentPage}&count=${postPerPage}`,
        {
          headers: { Authorization: `Bearer ${adminState.token}` },
        }
      )
      .then(response => {
        console.log(response);
        const list = response.data.data;
        const config = response.data.config;
        const orderList = list.sort((a,b)=> new Date(b.update_at)- new Date(a.update_at));
        let idList = [];
        const ids = list.map((item, i) => (idList[i] = item.uid));
        setList(orderList);
        setIdList(ids);
        setMaxPage(config.maxPage);
        //console.log(list.length, idList.length);
      })
      .catch(error => {
        console.log(error.response);
        if (error.response.status === 412) {
          localStorage.clear();
            toast({
              title: '토큰이 만료됐습니다.',
              description: '새로 로그인 해주세요!',
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
  }, [currentPage]);

  return (
    <Layout>
      <Box
       maxW='1600px'
       m='0 auto'
       padding={{base:"48px 24px", md:"48px"}}
      >
        <HStack justify="flex-end" mb={25} spacing="15px">
          <Link to='/prompts/create'>
          <PlusSquareIcon w={5} h={5} style={{ cursor: 'pointer' }} />
          </Link>
          <DeleteIcon
            onClick={onOpen}
            w={5}
            h={5}
            style={{ cursor: 'pointer' }}
          />
        </HStack>
        <Box
          overflowX="auto"
          css={{
            '&::-webkit-scrollbar': {
              //스크롤바 전체영역
              width: '5px',
            },
            '&::-webkit-scrollbar-track': {
              //스크롤바 움직이는 영역
              backgroundColor: '#fff',
            },
            '&::-webkit-scrollbar-thumb': {
              //스크롤
              backgroundColor: '#E6F4F1',
              borderRadius: '5px',
            },
          }}
        >
          <table className="CustomTableStyle">
            <thead>
              <tr className="Custom-tr Custom-thead-tr">
                <th className="CheckBox textCenter">
                  <Checkbox
                    name="all"
                    value="all"
                    colorScheme="blue"
                    isChecked={checkedItems.length === idList.length}
                    isIndeterminate={isIndeterminate}
                    onChange={CheckAll}
                  />
                </th>
                <th className="Custom-th1 textLeft">서비스 항목</th>
                <th className="Custom-th2">작성자</th>
                <th className="Custom-th3">작성일자</th>
                <th className="Custom-th3">최종수정일자</th>
                <th className="Custom-th4">상세보기</th>
              </tr>
            </thead>
            <tbody>
              {List &&
                List.map(item => (
                  <tr key={item.name} className="Custom-tr">
                    <td className="CheckBox textCenter">
                      <Checkbox
                        name="list"
                        value={item.uid}
                        colorScheme="blue"
                        isChecked={checkedItems.includes(item.uid)}
                        onChange={(e) => CheckEach(e, item.uid)}
                      />
                    </td>
                    <td className="textLeft">{item.name}</td>
                    <td className="textCenter">관리자</td>
                    <td className="textCenter">
                      {moment(item.create_at).format('YYYY-MM-DD')}
                    </td>
                    <td className="textCenter">
                      {moment(item.update_at).format('YYYY-MM-DD')}
                    </td>
                    <td className="textCenter">
                      <Link to={`/prompts/${item.uid}`}><DetailBtn>보기</DetailBtn></Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Box>
        <Flex m={4} alignItems="center" justifyContent="center">
          <Flex justifyContent="space-between">
            <Tooltip label="First Page">
              <IconButton
                size="sm"
                onClick={() => {
                  setCurrent(1);
                  if (currentPage === 1) {
                    toast({
                      title: '맨 처음 페이지',
                      description: '맨 처음 페이지에요!',
                      position: 'top-right',
                      status: 'info',
                      duration: 5000,
                      isClosable: true,
                    });
                  }
                }}
                icon={<ArrowLeftIcon h={3} w={3} />}
                mr={4}
              />
            </Tooltip>
            <Tooltip label="Previous Page">
              <IconButton
                size="sm"
                onClick={() => {
                  setCurrent(currentPage - 1);
                }}
                isDisabled={currentPage === 1 && true}
                icon={<ChevronLeftIcon h={6} w={6} />}
              />
            </Tooltip>
          </Flex>

          <Flex alignItems="center">
            <Text flexShrink="0" ml={5} mr={5}>
              <Text fontWeight="bold" as="span">
                {/* {pageIndex + 1} */}
                {currentPage}
              </Text>{' '}
              of{' '}
              <Text fontWeight="bold" as="span">
                {maxPage}
              </Text>
            </Text>
          </Flex>

          <Flex>
            <Tooltip label="Next Page">
              <IconButton
                size="sm"
                onClick={() => {
                  setCurrent(currentPage + 1);
                }}
                isDisabled={currentPage === maxPage && true}
                icon={<ChevronRightIcon h={6} w={6} />}
              />
            </Tooltip>
            <Tooltip label="Last Page">
              <IconButton
                size="sm"
                onClick={() => {
                  setCurrent(maxPage);

                  if (currentPage === maxPage) {
                    toast({
                      title: '마지막 페이지',
                      description: '마지막 페이지에요!',
                      position: 'top-right',
                      status: 'info',
                      duration: 5000,
                      isClosable: true,
                    });
                  }
                }}
                icon={<ArrowRightIcon h={3} w={3} />}
                ml={4}
              />
            </Tooltip>
          </Flex>
        </Flex>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>

          <ModalBody textAlign={'center'} fontSize='1.2rem' fontWeight={600} padding='20px 24px 10px'>삭제하시겠습니까?</ModalBody>
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

export default Prompts;
