import { useEffect, useState } from 'react';
import axios from 'axios';
import * as server from 'config/Config';
import {Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, HStack, Select, useToast} from '@chakra-ui/react';
import { Modify, SmallDelete } from 'styles/ComponentStyle';
import dayjs from 'dayjs';

const SerialDetail = ({UID, admin, isOpen, onClose}) => {
  const toast = useToast()
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

  const [previous, setPrevious] = useState({
    PreCampaign_name: '',
    PreDesc: '',
    PrePlan : ''
  });

  const {PreCampaign_name, PreDesc, PrePlan} = previous;

  const InputChange = (e) => {
    setDeatils({
      ...details,
      [e.target.id]: e.target.value
    })
  }

  const ModifyDetail = () => {
    if((PreCampaign_name === campaign_name) && (PreDesc === desc) && (PrePlan === plan)){
      toast({
        title: '내용이 그대로 입니다!',
        description: `수정된 내용이 없습니다.`,
        position: 'top-right',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    } else {
      const config = {
        method: 'put',
        url: `${server.SERVER_URL}/coupon?coupon_uid=${UID}`,
        headers: { Authorization: `Bearer ${admin.adminState.token}` },
        data: {
          campaign_name: campaign_name,
          desc: desc,
          plan: plan
        }
      }

      axios(config)
      .then((response)=>{
        //console.log(response);
        toast({
          title:'성공!',
          description: `수정 완료!`,
          position: 'top-right',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
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
      })
    }  
  }

  const DeleteDetail = () => {
    const config = {
      method: 'delete',
      url: `${server.SERVER_URL}/coupon?coupon_uid=${UID}`,
      headers: { Authorization: `Bearer ${admin.adminState.token}` },
    }

    axios(config)
    .then((response)=>{
      toast({
        title: '성공',
        description: '삭제 되었습니다!',
        position: 'top-right',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
    })
    .catch((error)=>{
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

  useEffect(()=>{
      if(UID) {
      const config = {
        method: 'get',
        url: `${server.SERVER_URL}/coupon/detail?coupon_uid=${UID}`,
        headers: { Authorization: `Bearer ${admin.adminState.token}` },
      }

      axios(config)
      .then((response)=>{
        const data = response.data.data;
        //console.log(data);
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

        setPrevious({...previous, 
          PreCampaign_name:data.campaign_name, 
          PreDesc:data.desc,
           PrePlan:data.plan});

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
                <p>{coupon_uid}</p>
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
                <Select
                className="selectOption"
                id="plan"
                value={plan}
                onChange={(e)=> setDeatils({...details, plan : Number(e.target.value)})}
              >
                <option value={0} disabled>
                  혜택을 선택해주세요
                </option>
                <option value={1}>1개월</option>
                <option value={3}>3개월</option>
                <option value={6}>6개월</option>
              </Select>
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
              <Modify onClick={ModifyDetail}>수정</Modify>
              <SmallDelete onClick={DeleteDetail}>삭제</SmallDelete>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}

export default SerialDetail;
