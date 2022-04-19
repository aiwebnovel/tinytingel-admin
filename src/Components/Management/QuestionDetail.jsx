import React from 'react';
//import { Link } from 'react-router-dom';
import { Box, CheckboxGroup, Checkbox, Flex } from '@chakra-ui/react';
import Layout from 'Common/Layout.jsx';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const QuestionDetail = () => {

  const navigate = useNavigate();
  
  return (
    <Layout>
      <Box className="QuestionContainer">
        <Box>
          <div className="QuestionBox">
            <h4>문의자</h4>
            <p>이태용</p>
          </div>
          <div className="QuestionBox">
            <h4>이메일</h4>
            <p>Taeoxo@gmail.com</p>
          </div>
          <div className="QuestionBox">
            <h4>문의 유형</h4>
            <p>오류신고</p>
            {/* <p>{`${moment(billStart).format('YYYY-MM-DD')} ~ ${exp}`}</p> */}
          </div>
          <div className="QuestionBox">
            <h4>문의내용</h4>
            <p style={{paddingBottom : '15px'}}>
              What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an
              unknown printer took a galley of type and scrambled it to make a
              type specimen book. It has survived not only five centuries, .
            </p>
          </div>
          <div className="QuestionBox">
            <h4>상태</h4>
            <CheckboxGroup colorScheme="#444">
              <Flex direction={{ base: 'column', sm: 'row' }}>
                <Checkbox value="done">답변 완료</Checkbox>
                <Checkbox value="check">확인</Checkbox>
                <Checkbox value="uncheck">미확인</Checkbox>
              </Flex>
            </CheckboxGroup>
          </div>

          <BtnBox>
            <Back onClick={()=> navigate(-1)}>뒤로 가기</Back>
            <Modify>확인</Modify>
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
