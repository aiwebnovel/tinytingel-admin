import React, { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
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
  Flex
} from '@chakra-ui/react';
import Layout from 'Common/Layout.jsx';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import moment from 'moment';
import * as server from 'config/Config';

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

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const renderDayContents = (date) => {
    return <span title={date}>{date}</span>;
  };


  const { membership, user } = Data;

  const fetchData = async () => {
    const config = {
      method: 'post',
      url: `${server.SERVER_URL}/user/list/search`,
      headers: { Authorization: `Bearer ${admin.adminState.token}` },
      data: {
        page: 1,
        count: 10000,
        membershipList: ['0', '1', '3', '6'],
        serviceList: ['iamport', 'innopay', 'nopassbook', 'none'],
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
        const data = response.data.data;

        const user = data.filter(item => item.user.user_uid === id);
        console.log(user);
        setData({
          ...Data,
          membership: user[0].membership,
          user: user[0].user,
        });
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 412) {
          localStorage.clear();
          navigate('/', { replace: true });
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
              <Link
                to={`/members/${id}/payment`}
                style={{ textDecoration: 'underline' }}
              >
                보러가기
              </Link>
            ) : (
              '멤버십을 구독하지 않은 회원입니다.'
            )}
          </div>
          <div className="InfoBox">
            <h4>구독상품</h4>
            <p>
              {membership.bill_service === 'none' && '멤버십을 구독하지 않은 회원입니다.'}
              {membership.bill_service !== 'none' &&
                membership.current > 0 &&
                `${membership.current}개월`}
              {membership.bill_service !== 'none' &&
                membership.current === 0 &&
                membership.before > 0 &&
                `${membership.before}개월`}
            </p>
          </div>
          <div className="InfoBox">
            <h4>이용기간</h4>
            <p>
              {/* 구독 x  */}
              {membership.bill_service === null &&
                '멤버십을 구독하지 않은 회원입니다.'}

              {/* 구독 했으나 해지 & 기간 안 지남*/}

              {membership.bill_service !== null &&
                membership.current === 0 &&
                formatToday <
                  moment(membership.next_date).format('YYYY-MM-DD') &&
                `멤버십을 구독하지 않은 회원입니다.`}

              {/* 구독 중 & 아직 기간 안 지남 */}
              {membership.bill_service !== null &&
                membership.current > 0 &&
                formatToday <
                  moment(membership.next_date).format('YYYY-MM-DD') &&
                `${moment(membership.next_date).format('YYYY-MM-DD')}`}

              {/* 구독 했으나 취소 후 이용 기간 지남 */}

              {membership.bill_service !== null &&
                membership.current === 0 &&
                formatToday >
                  moment(membership.next_date).format('YYYY-MM-DD') &&
                '멤버십을 구독하지 않은 회원입니다.'}

              {/* 기존 회원용 stopPay true 시 && 이용 기간 < 현재 날짜 */}
              {membership.bill_service !== null &&
                membership.current > 0 &&
                formatToday >
                  moment(membership.next_date).format('YYYY-MM-DD') &&
                '멤버십을 구독하지 않은 회원입니다.'}
            </p>
          </div>
          <div className="InfoBox">
            <h4>결제 예정일</h4>
            <p>
              {/* 구독 x  */}
              {membership.bill_service === 'none' &&
                '멤버십을 구독하지 않은 회원입니다.'}

              {/* 구독 했으나 해지 & 기간 안 지남*/}

              {membership.bill_service !== 'none' &&
                membership.current === 0 &&
                formatToday <
                  moment(membership.next_date).format('YYYY-MM-DD') &&
                `멤버십을 구독하지 않은 회원입니다.`}

              {/* 구독 중 & 아직 기간 안 지남 */}
              {membership.bill_service !== 'none' &&
                membership.current > 0 &&
                formatToday <
                  moment(membership.next_date).format('YYYY-MM-DD') &&
                `${moment(membership.next_date).format('YYYY-MM-DD')}`}

              {/* 구독 했으나 취소 후 이용 기간 지남 */}

              {membership.bill_service !== 'none' &&
                membership.current === 0 &&
                formatToday >
                  moment(membership.next_date).format('YYYY-MM-DD') &&
                '멤버십을 구독하지 않은 회원입니다.'}

              {/* 기존 회원용 stopPay true 시 && 이용 기간 < 현재 날짜 */}
              {membership.bill_service !== 'none' &&
                membership.current > 0 &&
                formatToday >
                  moment(membership.next_date).format('YYYY-MM-DD') &&
                '멤버십을 구독하지 않은 회원입니다.'}
            </p>
          </div>
          <div className="InfoBox">
            <h4>결제 수단</h4>
            <p>
              {membership.bill_service === 'none' && '멤버십을 구독하지 않은 회원입니다.'}
              {membership.bill_service !== 'none' &&
                membership.bill_service === 'iamport' &&
                '카카오페이'}
              {membership.bill_service !== 'none' &&
                membership.bill_service === 'innopay' &&
                '신용/체크'}
              {membership.bill_service !== 'none' &&
                membership.bill_service === 'nopassbook' &&
                '무통장'}
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
            <h4>구독상품</h4>
            <select className='ModalSelectStyle'>
              <option value='default'>선택</option>
              <option value='1'>1개월</option>
              <option value='3'>3개월</option>
              <option value='6'>6개월</option>
            </select>
          </div>
          <div className="ModalInfoBox">
            <h4>이용기간</h4>
            <Flex direction={'column'}>
            <DatePicker
              className="ModalDatePickerStyle"
              dateFormat="yyyy년 MM월 dd일"
              selected={startDate}
              maxDate={new Date()}
              onChange={date => setStartDate(date)}
              locale={ko}
              renderDayContents={renderDayContents}
            />
            ~ 
            <DatePicker
              className="ModalDatePickerStyle"
              dateFormat="yyyy년 MM월 dd일"
              selected={endDate}
              maxDate={new Date()}
              onChange={date => setEndDate(date)}
              locale={ko}
              renderDayContents={renderDayContents}
            />
            </Flex>
          </div>
          <div className="ModalInfoBox">
            <h4>무통장 입금</h4>
           <input type='checkbox'></input>
          </div>
              </Box>
          </ModalBody>
          <ModalFooter justifyContent={'center'}>
            <HStack>
              <Back>해지</Back>
              <Modify >수정</Modify>
              <Delete>삭제</Delete>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
};

export default MemInfo;

const BtnBox = styled.div`
  width: 100%;
  text-align: center;
  padding: 30px 0;
`;

const Back = styled.button`
  background-color: #b8c6db;
  padding: 2px 8px;
  border: 1px solid #b8c6db;
  border-radius: 5px;
  margin-right: 10px;
  width: 80px;
  transition: all 300ms ease;

  &:hover {
    background-color: #E2E8F0;
    border: 1px solid #E2E8F0;
  }
`;

const Modify = styled.button`
  background-color: #444;
  padding: 2px 8px;
  border: 1px solid #444;
  border-radius: 5px;
  color: #fff;
  width: 80px;
  transition: all 300ms ease;

  &:hover {
    background-color: #E6F4F1;
    border: 1px solid #E6F4F1;
    color : #444;
  }
`;

const Delete = styled.button`
  background-color: #FF5A52;
  padding: 2px 8px;
  border: 1px solid #FF5A52;
  border-radius: 5px;
  color: #fff;
  width: 80px;
  transition: all 300ms ease;

  &:hover {
    background-color: #D83536;
    border: 1px solid #D83536;
  }
`;
