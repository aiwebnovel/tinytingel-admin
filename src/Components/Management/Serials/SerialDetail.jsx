import { useEffect, useState } from 'react';
import axios from 'axios';
import * as server from 'config/Config';
import {Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, HStack, useToast} from '@chakra-ui/react';
import { Modify, SmallDelete } from 'styles/ComponentStyle';
import dayjs from 'dayjs';

const SerialDetail = ({UID, admin, isOpen, onClose}) => {
  const toast = useToast();
  
  const [details, setDeatils] = useState({
    coupon_uid:'',
    campaign_name:'',
    desc: '',
    plan:'',
    is_used:'',
    used_user_id:'',
    create_at:''
  });
  const [endDate, setEndDate] = useState('');

  const {coupon_uid, campaign_name, desc, plan, is_used, used_user_id, create_at} = details;  
  console.log(details);
  const InputChange = (e) => {
    setDeatils({
      ...details,
      [e.target.id]: e.target.value
    })
  }

  useEffect(()=>{
      console.log(UID);
      if(UID) {
      const config = {
        method: 'get',
        url: `${server.SERVER_URL}/coupon/detail?coupon_uid=${UID}`,
        headers: { Authorization: `Bearer ${admin.adminState.token}` },
      }

      axios(config)
      .then((response)=>{
        const data = response.data.data;
        console.log(data);
        setDeatils({
          ...details,
          coupon_uid: data.coupon_uid,
          campaign_name:data.campaign_name,
          desc: data.desc,
          plan: data.plan,
          is_used: data.is_used,
          used_user_id: data.used_user_id,
          create_at: data.create_at
        });

        let after = dayjs(data.create_at).add(data.plan, 'month');
        let afterDay = dayjs(after.$d).format("YYYY-MM-DD");
        setEndDate(afterDay);

      })
      .catch((error)=>{
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
  },[UID]);

    return(
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
          {/* {details && ( */}
            <Box>
              <div className="SerialDetailModal">
                <h4>시리얼넘버</h4>
                <input type='text' id='coupon_uid' value={coupon_uid} onChange={InputChange}/>
              </div>
             <div className="SerialDetailModal">
                <h4>캠페인명</h4>
                <input type='text' id='campaign_name' value={campaign_name} onChange={InputChange}/>
              </div>
              <div className="SerialDetailModal">
                <h4>상세설명</h4>
                <input type='text' id='desc' value={desc} onChange={InputChange}/>
              </div>
                <div className="SerialDetailModal">
                <h4>생성일자</h4>
                <p>{dayjs(create_at).format("YYYY-MM-DD")}</p>
              </div>
              <div className="SerialDetailModal">
                <h4>혜택구분</h4>
                <p>{`${plan}개월`}</p>
              </div>
             <div className="SerialDetailModal">
                <h4>사용여부</h4>
                <p>{is_used ? '사용':'미사용'}</p>
              </div>
               <div className="SerialDetailModal">
                <h4>사용기간</h4>
                <p>{`${dayjs(create_at).format("YYYY-MM-DD")} ~ ${endDate}`}</p> 
              </div>
              <div className="SerialDetailModal">
                <h4>사용자</h4>
                <p>{used_user_id ? used_user_id : '사용자 아이디가 없습니다.'}</p> 
              </div>
          </Box> 
          {/* )} */}
          </ModalBody>
          <ModalFooter justifyContent={'center'}>
            <HStack>
              <Modify>수정</Modify>
              <SmallDelete>삭제</SmallDelete>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}

export default SerialDetail;