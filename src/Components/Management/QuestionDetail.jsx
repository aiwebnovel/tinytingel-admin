import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, CheckboxGroup, Checkbox, Flex } from '@chakra-ui/react';
import Layout from 'Common/Layout.jsx';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import * as server from 'config/Config';

const QuestionDetail = () => {
  const admin = JSON.parse(localStorage.getItem('admin'));
  const navigate = useNavigate();
  const { id } = useParams();

  const [inquiry, setInquiry] = useState('');

  const ModifyStatus = () => {};

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
        console.log(inquiry.status);
        setInquiry(inquiry);
      })
      .catch(error => {
        console.log(error);
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
            <h4>문의자</h4>
            <p>{inquiry.name}</p>
          </div>
          <div className="QuestionBox">
            <h4>이메일</h4>
            <p>{inquiry.email}</p>
          </div>
          <div className="QuestionBox">
            <h4>문의 유형</h4>
            <p>{inquiry.category}</p>
          </div>
          <div className="QuestionBox">
            <h4>문의 제목</h4>
            <p>{inquiry.title}</p>
          </div>
          <div className="QuestionBox">
            <h4>문의 내용</h4>
            <p>{inquiry.content}</p>
          </div>
          <div className="QuestionBox">
            <h4>상태</h4>
            <Flex direction={{ base: 'column', sm: 'row' }} gridGap='15px'>
              <label className='QuestionLabel'>
                <input type="checkbox" value="answered" />
                답변 완료
              </label>
              <label className='QuestionLabel'>
                <input type="checkbox" value="checked" />
                확인
              </label>
              <label className='QuestionLabel'>
                <input type="checkbox" value="unchecked" />
                미확인
              </label>
            </Flex>

          </div>

          <BtnBox>
            <Back onClick={() => navigate(-1)}>뒤로 가기</Back>
            <Modify onClick={ModifyStatus}>확인</Modify>
          </BtnBox>
        </Box>
      </Box>
    </Layout>
  );
};

export default QuestionDetail;

const BtnBox = styled.div`
  width: 100%;
  text-align: center;
  padding: 30px 0;
`;

const Back = styled.button`
  background-color: #b8c6db;
  padding: 2px 10px;
  border: 1px solid #b8c6db;
  border-radius: 5px;
  margin-right: 10px;
`;

const Modify = styled.button`
  background-color: #444;
  padding: 2px 15px;
  border: 1px solid #444;
  border-radius: 5px;
  color: #fff;
`;
