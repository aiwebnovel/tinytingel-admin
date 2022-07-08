import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  HStack,
  Flex,
} from '@chakra-ui/react';

import Layout from 'Common/Layout.jsx';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import moment from 'moment';
import * as server from 'config/Config';
import {Back, BtnBox} from 'styles/ComponentStyle';
import { CustomInput } from 'Common/CustomInput';

const MemInfo = () => {
  const { id } = useParams();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem('admin'));
  const today = new Date();
  const formatToday = moment(today).format('YYYY-MM-DD');

  const [Data, setData] = useState({
    membership: '',
    user: '',
  });

  const { membership, user } = Data;

  const [selectedMembership, setSelected] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [passbook, setPassbook] = useState(false);

  

  const ChangeSelectedAndEndDate = e => {
    setSelected(e.target.value);
    const addMonth = moment(startDate).add(e.target.value, 'months').calendar();
    setEndDate(addMonth);
  };

  const ModifyUserData = () => {
    console.log(parseInt(selectedMembership), passbook, endDate);
    const plan = parseInt(selectedMembership);
    const fomatEndDate = moment(endDate).format('YYYY-MM-DD');

    if(membership.bill_service === 'none' && !passbook) {
      toast({
        title: '체크하셨나요?',
        description: '멤버십이 없는 유저는 수정시 무통장 입금 체크가 필수입니다.',
        position: 'top-right',
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
    } else {
    const config = {
      method: 'put',
      url: `${server.SERVER_URL}/user/plan?user_uid=${id}`,
      headers: { Authorization: `Bearer ${admin.adminState.token}` },
      data: {
        plan: plan,
        isNoPassbook: passbook,
        endDate: fomatEndDate,
      },
    };

    axios(config)
      .then(response => {
        console.log(response);
        onClose();
        navigate(0);
        toast({
          title: '성공!',
          description: '수정되었습니다.',
          position: 'top-right',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(error => {
        console.log(error);
        toast({
          title: '실패',
          description: `수정할 내용이 잘 들어갔는지 확인해주세요!`,
          position: 'top-right',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
      }
  };

  const UnSubscribe = () => {
    if (window.confirm('해지하시겠습니까?')) {
      axios
        .delete(`${server.SERVER_URL}/user/plan?user_uid=${id}`, {
          headers: { Authorization: `Bearer ${admin.adminState.token}` },
        })
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
  };

  const DeleteUser = () => {
    if (window.confirm('삭제 하시겠습니까?')) {
      axios
        .delete(`${server.SERVER_URL}/user/?user_uid=${id}`, {
          headers: { Authorization: `Bearer ${admin.adminState.token}` },
        })
        .then(response => {
          console.log(response);
          navigate('/members');
          setTimeout(
            toast({
              title: '성공',
              description: '삭제 되었습니다!',
              position: 'top-right',
              status: 'success',
              duration: 5000,
              isClosable: true,
            }),
            5000
          );
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
  };

  const fetchData = async e => {

    const config = {
      method: 'post',
      url: `${server.SERVER_URL}/user/list/search`,
      headers: { Authorization: `Bearer ${admin.adminState.token}` },
      data: {
        page: 1,
        count: 10000,
        membershipList: ['0', '1', '3', '6'],
        serviceList: ['iamport', 'innopay', 'nopassbook', 'kakao','inicis','none'],
        keyword: '',
        periodOption: {
          option: 'create_at',
          startDate: '2021-01-01',
          endDate: formatToday,
        },
      },
    };

    await axios(config)
      .then(response => {
        console.log(response);
        const data = response.data.data;

        const user = data.filter(item => item.user.user_uid === id);
        const userData = user[0];
        //결제 자체를 x
        if (userData.membership.bill_service === 'none') {
          setStartDate(today);
          setEndDate(today);
        }

        //결제 O / 최근 결제 O (start recent 다 있으면) 
        if(userData.membership.bill_service !== 'none' &&
        userData.membership.start_date !== null &&
          userData.user.membership_recent_date !== null) {
            setStartDate(new Date(userData.user.membership_recent_date));
            setEndDate(new Date(userData.membership.next_date));
        }

        //결제 했으나 최근 결제 x
        if (userData.membership.bill_service !== 'none' &&
        userData.membership.start_date !== null &&
          userData.user.membership_recent_date === null
        ) {
          setStartDate(new Date(userData.membership.start_date));
          setEndDate(new Date(userData.membership.next_date));
        }

      
        if(userData.membership.bill_service === 'nopassbook') {
          setPassbook(true);
        }

        console.log(user);
        setData({
          ...Data,
          membership: userData.membership,
          user: userData.user,
        });

        setSelected(userData.membership.current);
      })
      .catch(error => {
        console.log(error);
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
  }, []);

  return (
    <Layout>
      <Box className="InfoContainer">
        <Box className="InfoContent">
          <Heading as="h4" size="lg" margin="15px 0 15px 15px">
            💡 Info
          </Heading>
          <div className="InfoBox">
            <h4>이름</h4>
            <p>{user.name}</p>
          </div>
          <div className="InfoBox">
            <h4>이메일</h4>
            <p>{user.email}</p>
          </div>
          <div className="InfoBox">
            <h4>가입일자</h4>
            <p>{`${moment(user.create_at).format('YYYY-MM-DD')}`}</p>
          </div>
          <div className="InfoBox" style={{ backgroundColor: '#f9f9f9' }}>
            <h4>결제내역</h4>
            {membership.bill_service !== 'none' ? (
              <p
                style={{ textDecoration: 'underline', cursor: 'pointer' }}
                onClick={() => {
                  toast({
                    title: '준비 중',
                    description: '결제 로그 이전 준비 중!',
                    position: 'top-right',
                    status: 'info',
                    duration: 5000,
                    isClosable: true,
                  });
                }}
              >
                보러가기
              </p>
            ) : (
              // <Link
              //   to={`/members/${id}/payment`}
              //   style={{ textDecoration: 'underline' }}
              // >
              //   보러가기
              // </Link>
              '멤버십을 구독하지 않은 회원입니다.'
            )}
          </div>
          <div className="InfoBox">
            <h4>구독상품</h4>
            <p>
              {membership.bill_service === 'none' &&
                '멤버십을 구독하지 않은 회원입니다.'}
              {membership.bill_service !== 'none' &&
                membership.current > 0 &&
                `${membership.current}개월`}

              {membership.bill_service !== 'none' &&
                membership.current === 0 &&
                membership.before > 0 &&
                `${membership.before}개월`}

              {/* 구독 중 & 멤버십 취소 했을 때*/}
              {membership.bill_service !== 'none' && user.membership_cancel && (
                <Canceled>구독 취소</Canceled>
              )}
            </p>
          </div>
          <div className="InfoBox">
            <h4>최초 구독일</h4>
            <p>
              {/* 구독 X */}
              {membership.bill_service === 'none' &&
                '멤버십을 구독하지 않은 회원입니다.'}

              {/* 구독한 적 있음 / 구독 시작날짜 있음 */}
              {membership.bill_service !== 'none' &&
                membership.start_date !== null &&
                `${moment(membership.start_date).format(
                  'YYYY-MM-DD')}`}


              {/* 구독한 적 있음 / 구독 시작날짜 없음 */}
              {membership.bill_service !== 'none' &&
                membership.start_date === null &&
                `${moment(user.membership_recent_date).format(
                  'YYYY-MM-DD')}`}

            </p>
          </div>
          <div className="InfoBox">
            <h4>이용기간</h4>
            <p>
              {/* 구독 X */}
              {membership.bill_service === 'none' &&
                '멤버십을 구독하지 않은 회원입니다.'}

              {/* 구독한 적 있음 / 최근 결제일 없음 */}
              {membership.bill_service !== 'none' &&
                user.membership_recent_date === null &&
                `${moment(membership.start_date).format(
                  'YYYY-MM-DD'
                )} ~ ${moment(membership.next_date).format('YYYY-MM-DD')}`}

              {/* 구독한 적 있음 / 최근 결제일 있음  */}
              {membership.bill_service !== 'none' &&
                user.membership_recent_date !== null &&
                `${moment(user.membership_recent_date).format(
                  'YYYY-MM-DD'
                )} ~ ${moment(membership.next_date).format('YYYY-MM-DD')}`}
            </p>
          </div>
          <div className="InfoBox">
            <h4>결제 예정일</h4>
            <p>
              {/* 구독 x  */}
              {membership.bill_service === 'none' &&
                '멤버십을 구독하지 않은 회원입니다.'}

              {/* 구독 중 & 취소 안함*/}

              {membership.bill_service !== 'none' &&
                !user.membership_cancel &&
                moment(membership.next_date).format('YYYY-MM-DD')}

              {/* 구독 중 & 취소함 */}
              {membership.bill_service !== 'none' &&
                user.membership_cancel &&
                '구독 취소'}
            </p>
          </div>
          <div className="InfoBox">
            <h4>결제 수단</h4>
            <p>
              {membership.bill_service === 'none' &&
                '멤버십을 구독하지 않은 회원입니다.'}
              {membership.bill_service === 'iamport' && '카카오페이'}
              {membership.bill_service === 'innopay' && '신용/체크'}
              {membership.bill_service === "kakao" && "카카오페이"}
              {membership.bill_service === "inicis" && "신용/체크카드 결제"}
              {membership.bill_service === 'nopassbook' && '무통장'}
            </p>
          </div>
        </Box>
        <BtnBox>
          <Back
            onClick={() => {
              navigate(`/members`);
            }}
          >
            뒤로 가기
          </Back>
          <Modify onClick={onOpen}>수정</Modify>
        </BtnBox>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>

          <ModalBody>
            <Box>
              <div className="ModalInfoBox">
                <h4>이름</h4>
                <p>{user.name}</p>
              </div>
              <div className="ModalInfoBox">
                <h4>이메일</h4>
                <p>{user.email}</p>
              </div>
              <div className="ModalInfoBox">
                <h4>가입일자</h4>
                <p>{`${moment(user.create_at).format('YYYY-MM-DD')}`}</p>
              </div>
                <div className="ModalInfoBox">
                <h4>가입일자</h4>
                <p>{`${moment(user.create_at).format('YYYY-MM-DD')}`}</p>
              </div>
              <div className="ModalInfoBox">
                <h4>구독상품</h4>
                <select
                  className="ModalSelectStyle"
                  onChange={ChangeSelectedAndEndDate}
                  value={selectedMembership}
                >
                  <option value="0" disabled>
                    없음
                  </option>
                  <option value="1">1개월</option>
                  <option value="3">3개월</option>
                  <option value="6">6개월</option>
                </select>
              </div>
              <div className="ModalInfoBox">
                <h4>이용기간</h4>
                <Flex direction={'column'}>
                  <Flex align='center' gridGap={'5px'}>
                  <input
                    className="ModalDatePickerStyle"
                    value={moment(startDate).format('yyyy/MM/DD')}
                    readOnly
                  /> 
                  <SpanBtn onClick={()=> setStartDate(today)}>오늘 날짜</SpanBtn>
                  </Flex>
                  ~
                  <Flex justify="space-between" align="flex-start" w="100%">
                    <input
                      className="ModalDatePickerStyle no-outline"
                      value={moment(endDate).format('yyyy/MM/DD')}
                      readOnly
                    />

                    <DatePicker
                      className="IconDatePicker"
                      locale={ko}
                      onChange={date => setEndDate(date)}
                      customInput={<CustomInput />}
                    />
                  </Flex>
                </Flex>
              </div>
              <div className="ModalInfoBox">
                <h4>무통장 입금</h4>
                <input
                  type="checkbox"
                  name="nopassbook"
                  value={passbook}
                  onChange={e => setPassbook(e.target.checked)}
                  disabled={membership.bill_service !== 'none' ? true : false}
                />
              </div>
            </Box>
          </ModalBody>
          <ModalFooter justifyContent={'center'}>
            <HStack>
              <Back onClick={UnSubscribe}>구독해지</Back>
              <Modify onClick={ModifyUserData}>구독수정</Modify>
              <Delete onClick={DeleteUser}>회원삭제</Delete>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
};

export default MemInfo;

const Modify = styled.button`
  background-color: #444;
  padding: 2px 8px;
  border: 1px solid #444;
  border-radius: 5px;
  color: #fff;

  transition: all 300ms ease;

  &:hover {
    background-color: #e6f4f1;
    border: 1px solid #e6f4f1;
    color: #444;
  }
`;

const Delete = styled.button`
  background-color: #ff5a52;
  padding: 2px 8px;
  border: 1px solid #ff5a52;
  border-radius: 5px;
  color: #fff;
  width: 80px;
  transition: all 300ms ease;

  &:hover {
    background-color: #d83536;
    border: 1px solid #d83536;
  }
`;

const Canceled = styled.span`
  background-color: transparent;
  margin-left: 10px;
  border: 0;
  color: #e3def1;
  outline: 0;
  font-size: 15px;

  @media screen and (max-width: 768px) {
    margin: 0;
    font-size: 13px;
  }
`;

const SpanBtn = styled.span`
  font-size : 15px;
  text-decoration : underline;
  cursor : pointer;

  &:hover {
    font-weight: 600;
  }
`
