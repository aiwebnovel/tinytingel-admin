import { useState,useCallback } from 'react';
import axios from 'axios';
import Layout from 'Common/Layout';
import {
  Box,Flex,Button,Input,Checkbox,HStack,useDisclosure,Skeleton,Stack,Modal,ModalOverlay, useToast,
  ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,Tooltip,Text,IconButton,Select} from '@chakra-ui/react';
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  DeleteIcon
} from '@chakra-ui/icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import styled from 'styled-components';
import { CustomInput } from 'Common/CustomInput';
import {
  DeleteBtn,
  CancelBtn,
  TrStyle,
  TbodyStyle,
  SerialInputBox,
  ExtraBtn,
} from 'styles/ComponentStyle';
import SerialDetail from './SerialDetail';
import * as server from 'config/Config';
import dayjs from 'dayjs';

const DateInputStyle = styled(Flex)`
  > div:nth-child(2) {
    width: 30px;
  }
`;

const TrThStyle = styled.tr`
  text-align: center;

  .Custom-1 {
    width: 80px;
  }

  .Custom-2 {
    width: 500px;
  }

  .Custom-3,
  .Custom-4,
  .Custom-7 {
    width: 200px;
  }

  .Custom-5, .Custom-6, .Custom-8 {
    width: 100px;
  }

`;

const GetSerial = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const admin = JSON.parse(localStorage.getItem('admin'));

  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrent] = useState(1); //현재 페이지;
  const [postPerPage, setPostPerPage] = useState(30); //페이지당 포스트 개수
  const [maxPage, setMaxPage] = useState('');
  const [searchBody, setSearchBody] = useState({
    campaign_name: "", //캠페인명
    coupon_uid: "", // 쿠폰 uid
    is_used: "", // 시용 여부
    user: "" // 유저 이메일
  });
  const [plan, setPlan] = useState(0);
  const {campaign_name,coupon_uid,is_used,user} = searchBody

   let initial = {
    page: currentPage,
   count: postPerPage,
   campaign_name:campaign_name,
   coupon_uid:coupon_uid,
   is_used:is_used,
   user:user
  };

  let withPlan = {
    page: currentPage,
    count: postPerPage,
    campaign_name:campaign_name,
    coupon_uid:coupon_uid,
    is_used:is_used,
    plan:plan,
    user:user
  }



  const [data, setData] = useState('');

  const HandleSearchBody = (e) => {
    setSearchBody({...searchBody, [e.target.id]:e.target.value});
    console.log(campaign_name);
  }
  
  const HandleDetailModal = () => {
    setModalOpen(!modalOpen);
  };

 


  const SearchSerial = useCallback(() => {
    console.log(initial)
     const config = {
      method: 'post',
      url: `${server.SERVER_URL}/coupon/list`,
      headers: { Authorization: `Bearer ${admin.adminState.token}` },
      data: initial
    }

    const configWithPlan = {
      method: 'post',
      url: `${server.SERVER_URL}/coupon/list`,
      headers: { Authorization: `Bearer ${admin.adminState.token}` },
      data: withPlan
    }

    setLoading(true);

    axios(plan > 0 ? configWithPlan : config)
    .then((response)=>{
      console.log(response);
      const data = response.data.data;
      const maxPage = response.data.config.maxPage;

      const orderList = data.sort(
        (a, b) => new Date(b.create_at) - new Date(a.create_at)
      );

      setMaxPage(maxPage);
      setData(orderList);

    })
    .catch((error)=>{
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

          toast({
            title: 'error!',
            description: `${error.message}`,
            position: 'top-right',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
    })
    .finally(()=>{
      setLoading(false);
    })

  },[currentPage,campaign_name,coupon_uid,is_used,plan,user]);



  return (
    <Layout>
      <Box className="MemberContainer">
        <Box
          maxW="1300px"
          m="0 auto"
          bg="#fff"
          padding="36px"
          boxShadow="rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px"
        >
          <SerialInputBox>
            <label htmlFor="campaign_name">캠페인명</label>
            <Input type="text" id="campaign_name" value={campaign_name} onChange={HandleSearchBody}></Input>
          </SerialInputBox>
          <SerialInputBox>
            <label htmlFor="coupon_uid">시리얼넘버</label>
            <Input type="text" id="coupon_uid"  value={coupon_uid} onChange={HandleSearchBody}></Input>
          </SerialInputBox>
          <SerialInputBox>
            <label>생성일자</label>
            <DateInputStyle align="center" gridGap={'5px'}>
              <Input
                // value={moment(startDate).format('yyyy/MM/DD')}
                readOnly
              />
              <DatePicker
                locale={ko}
                //   onChange={date => setEndDate(date)}
                customInput={<CustomInput />}
              />
            </DateInputStyle>
            ~
            <DateInputStyle ml={'8px'} align="center" gridGap={'5px'}>
              <Input
                //   value={moment(endDate).format('yyyy/MM/DD')}
                readOnly
              />

              <DatePicker
                locale={ko}
                //   onChange={date => setEndDate(date)}
                customInput={<CustomInput />}
              />
            </DateInputStyle>
          </SerialInputBox>
          <Flex justify={'space-between'} gridGap="20px">
          <SerialInputBox w="50%">
              <label htmlFor="plan">혜택구분</label>
              <Select
                className="selectOption"
                id="plan"
                value={plan}
                onChange={e => setPlan(Number(e.target.value))}
              >
                <option value={0} disabled>
                  혜택을 선택해주세요
                </option>
                <option value={1}>1개월</option>
                <option value={3}>3개월</option>
                <option value={6}>6개월</option>
              </Select>
            </SerialInputBox>
            <SerialInputBox w="50%">
            <label htmlFor='is_user'>사용여부</label>
            <Flex gridGap={'8px'}>
              <Checkbox id='is_user' value={1} onChange={HandleSearchBody}>사용</Checkbox>
              <Checkbox id='is_user' value={0} onChange={HandleSearchBody}>미사용</Checkbox>
            </Flex>
          </SerialInputBox>
            </Flex>
         

          <SerialInputBox>
            <label htmlFor="user">사용자</label>
            <Input type="text" id="user" value={user} onChange={HandleSearchBody}></Input>
          </SerialInputBox>
          <Box textAlign={'right'}>
            <Button onClick={SearchSerial}>검색하기</Button>
          </Box>
        </Box>

        {loading && (
          <Box p="36px">
            <Stack>
              <Skeleton height="30px" />
              <Skeleton height="30px" />
              <Skeleton height="30px" />
              <Skeleton height="30px" />
              <Skeleton height="30px" />
            </Stack>
          </Box>
        )}

        {/* 시리얼 결과 테이블 */}
        {!loading && data && (
          <>
          <Box className="TableContainer">
            <Flex justify="flex-end" mb={25} spacing="15px">
              <DeleteIcon
                onClick={onOpen}
                w={5}
                h={5}
                style={{ cursor: 'pointer' }}
              />
            </Flex>
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
              <table className="MemberCustomTableStyle">
                <thead>
                  <TrThStyle  className="MemberCustom-tr MemberCustom-thead-tr">
                    <th className="Custom-1">
                      <Checkbox name="all" value="all" colorScheme="blue" />
                    </th>
                    <th className="Custom-2">시리얼 넘버</th>
                    <th className="Custom-3">캠페인명</th>
                    <th className="Custom-4">생성일자</th>
                    <th className="Custom-5">혜택구분</th>
                    <th className="Custom-6">사용</th>
                    <th className="Custom-7">사용자</th>
                    <th className="Custom-8">상세</th>
                  </TrThStyle >
                </thead>
                <TbodyStyle>
                  {data.map(item=>(
                  <TrStyle  className="MemberCustom-tr" key={item.coupon_uid}>
                  <td>
                    <Checkbox name="all" value="all" colorScheme="blue" />
                  </td>
                  <td>{item.coupon_uid}</td>
                  <td>{item.campaign_name}</td>
                  <td>{dayjs(item.create_at).format('YYYY-MM-DD')}</td>
                  <td>{item.plan}개월</td>
                  <td>{item.is_used === 0 ? 'N' : 'Y'}</td>
                  <td>{item.email}</td>
                  <td>
                    <ExtraBtn onClick={HandleDetailModal}>상세</ExtraBtn>
                  </td>
                </TrStyle>
                  ))}

                </TbodyStyle>
              </table>
            </Box>
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
        
                    <IconButton
                      size="sm"
                      onClick={() => {
                        setCurrent(currentPage => currentPage - 1);
                      }}
                      isDisabled={currentPage === 1 && true}
                      icon={<ChevronLeftIcon h={6} w={6} />}
                    />
                  </Flex>
        
                  <Flex alignItems="center" flexShrink="0" ml={5} mr={5}>
                    <Text>
                      <Text fontWeight="bold" as="span">
                        {currentPage}
                      </Text>{' '}
                      of{' '}
                      <Text fontWeight="bold" as="span">
                        {maxPage}
                      </Text>
                    </Text>
                  </Flex>
        
                  <Flex>
                    <IconButton
                      size="sm"
                      onClick={() => {
                        setCurrent(currentPage => currentPage + 1);
                      }}
                      isDisabled={currentPage === maxPage && true}
                      icon={<ChevronRightIcon h={6} w={6} />}
                    />
        
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
                </>
        )}
      </Box>
      <SerialDetail isOpen={modalOpen} onClose={HandleDetailModal} />
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
              <DeleteBtn>삭제</DeleteBtn>
              <CancelBtn onClick={onClose}>취소</CancelBtn>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
};

export default GetSerial;
