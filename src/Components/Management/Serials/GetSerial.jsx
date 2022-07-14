import { useState, useCallback, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from 'Common/Layout';
import {
  Box,
  Flex,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  useToast,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import 'react-datepicker/dist/react-datepicker.css';
import { DeleteBtn, CancelBtn, NoDataBox } from 'styles/ComponentStyle';
import SerialDetail from './SerialDetail';
import * as server from 'config/Config';
import SerialTable from './SerialTable';
import Pagination from './Pagination';
import SearchSerialBox from './SearchSerialBox';
import dayjs from 'dayjs';

const GetSerial = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const admin = JSON.parse(localStorage.getItem('admin'));
  const navigate = useNavigate();
  const [uid, setUid] = useState('');

  //체크된 아이템
  const [checkedItems, setCheckedItems] = useState([]);
  //체크용 id 리스트
  const [uidList, setUidList] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrent] = useState(1); //현재 페이지;
  const [maxPage, setMaxPage] = useState('');
  const [searchBody, setSearchBody] = useState({
    campaign_name: '', //캠페인명
    coupon_uid: '', // 쿠폰 uid
    is_used: '', // 시용 여부
    user: '', // 유저 이메일
  });
  const [plan, setPlan] = useState(0);
  const [startDate, setStartDate] = useState(new Date('July 1, 2022'));
  const [endDate, setEndDate] = useState(new Date());
  
  const { campaign_name, coupon_uid, is_used, user } = searchBody;

  let initial = {
    page: currentPage,
    count: 30,
    campaign_name: campaign_name,
    coupon_uid: coupon_uid,
    is_used: is_used,
    user: user,
    startDate: startDate, 
    endDate: dayjs(endDate).add('1','day').$d
  };

  let withPlan = {
    page: currentPage,
    count: 30,
    campaign_name: campaign_name,
    coupon_uid: coupon_uid,
    is_used: is_used,
    plan: plan,
    user: user,
    startDate: startDate, 
    endDate: dayjs(endDate).add('1','day').$d
  };
  const [data, setData] = useState('');

  const HandleSearchBody = e => {
    setSearchBody({ ...searchBody, [e.target.id]: e.target.value });
  };
  const HandleDetailModal = UID => {
    setModalOpen(!modalOpen);
    setUid(UID);
  };

  //시리얼 넘버 전부 체크
  const CheckAll = e => {
    setCheckedItems(e.target.checked ? uidList : []);
  };

  const CheckEach = (e, uid) => {
    //체크 되면 CheckedItems에 해당 uid 넣기
    if (e.target.checked) {
      setCheckedItems([...checkedItems, uid]);
    } else {
      setCheckedItems(checkedItems.filter(item => item !== uid));
    }
  };

  const DeleteSerial = () => {
    //uid 전부 넣은 리스트에서 checkeditem에 있는 uid만 가져오기
    const checkedArray = uidList.filter(item => checkedItems.includes(item));

    if (checkedArray.length === 0) {
      onClose();
      toast({
        title: '선택한 유저가 없어요!',
        description: '삭제할 유저를 선택해주세요.',
        position: 'top-right',
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
    }

    if (checkedArray.length === 1) {
      axios
        .delete(`${server.SERVER_URL}/coupon?coupon_uid=${checkedArray[0]}`, {
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

    if (checkedArray.length > 1) {
      Promise.all(
        checkedArray.map(async param => {
          return await axios.delete(
            `${server.SERVER_URL}/coupon?coupon_uid=${param}`,
            {
              headers: { Authorization: `Bearer ${admin.adminState.token}` },
            }
          );
        })
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
  };

  const Reset = () => {
    setSearchBody({
      ...searchBody,
      campaign_name: '',
      coupon_uid: '', 
      is_used: '',
      user: '', 
    });
    setPlan(0);
    setStartDate(new Date('July 1, 2022'));
    setEndDate(new Date());
  }

  const SearchSerial = useCallback(() => {
    console.log(startDate, endDate);
    const config = {
      method: 'post',
      url: `${server.SERVER_URL}/coupon/list`,
      headers: { Authorization: `Bearer ${admin.adminState.token}` },
      data: initial,
    };

    const configWithPlan = {
      method: 'post',
      url: `${server.SERVER_URL}/coupon/list`,
      headers: { Authorization: `Bearer ${admin.adminState.token}` },
      data: withPlan,
    };

    axios(plan > 0 ? configWithPlan : config)
      .then(response => {
       console.log(response);
        const data = response.data.data;
        const maxPage = response.data.config.maxPage;

        const orderList = data.sort(
          (a, b) => new Date(b.create_at) - new Date(a.create_at)
        );

        let uidList = [];
        const uids = orderList.map((item, i) => (uidList[i] = item.coupon_uid));
        setUidList(uids);

        setMaxPage(maxPage);
        setData(orderList);
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
      })
  }, [currentPage, maxPage, campaign_name, coupon_uid, is_used, plan, user, startDate, endDate]);
  
  useLayoutEffect(()=>{
    SearchSerial();
  },[currentPage]);

  return (
    <Layout>
      <Box className="MemberContainer">
        <SearchSerialBox
        campaign_name={campaign_name}
        HandleSearchBody={HandleSearchBody}
        coupon_uid={coupon_uid}
        plan={plan}
        setPlan={setPlan}
        user={user}
        is_used={is_used}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        SearchSerial={SearchSerial}
        Reset={Reset}
        />
        {/* 시리얼 결과 테이블 */}
        {data.length === 0 && (<NoDataBox>결과가 없습니다! 🤭</NoDataBox> )}
        {data.length !== 0 && (
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
              <SerialTable
              data={data} uidList={uidList} checkedItems={checkedItems} CheckAll={CheckAll} CheckEach={CheckEach} HandleDetailModal={HandleDetailModal}
              />
            </Box>
           <Pagination currentPage={currentPage} setCurrent={setCurrent} maxPage={maxPage}/>
          </>
        )}
      </Box>
      <SerialDetail
        admin={admin}
        UID={uid}
        isOpen={modalOpen}
        onClose={HandleDetailModal}
      />
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
              <DeleteBtn onClick={DeleteSerial}>삭제</DeleteBtn>
              <CancelBtn onClick={onClose}>취소</CancelBtn>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
};

export default GetSerial;
