import React from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import Layout from 'Common/Layout';
import styled from 'styled-components';

const Container = styled(Box)`
  background-color : #fff;
  border: 1px solid #444;
  padding: 30px 20px;
  max-width: 1200px;
  margin: 0 auto;
`

const TextareaBox = styled(Box)`
  width: 100%;
  //max-width: 800px;
  border: 1px solid #444;
`

const ButtonBox = styled(Box)`
  width: 100%;
  background-color : #f9f9f9;
  padding: 10px;
`

const CancelBtn = styled.button`
  background-color: #fff;
  border: 1px solid #444;
  border-radius: 5px;
  color: #444;
  padding: 2px 25px;
  transition: all 300ms ease;

  &:hover {
    background-color: #444;
    //border: 1px solid #444;
    color: #fff;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
  }
`

const DeleteBtn = styled.button`
  background-color: #ff5a52;
  //border: 1px solid #FF5A52;
  border-radius: 5px;
  color: #fff;
  padding: 2px 25px;
  transition: all 300ms ease;

  &:hover {
    background-color: #d83536;
    //border: 1px solid #D83536;
    color: #fff;
  }
  
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`



const PromptDetail = () => {
  return (
    <Layout>
      <Box padding="48px">
        <Container>
          <Flex w="100%" direction={'column'} className='makePromtLabelInput'>
            <label for="name">서비스명</label>
            <input type="text" id="name" />
          </Flex>
          <Flex  w="100%" direction={'column'}  className='makePromtLabelInput'>
            <label for="writer">
              작성자
            </label>
            <input type="text" id="writer" />
          </Flex>
          <Flex  w="100%" direction={'column'}  className='makePromtLabelInput'>
            <label for="engine">
              engine
            </label>
            <input type="text" for="engine" />
          </Flex>
        <Flex w="100%" direction={'column'}  className='makePromtLabelTextarea'>
            <label for="prompt">prompt </label>
            <TextareaBox>
              <textarea id="prompt" />
              <ButtonBox>
                <Button>사용자 입력부분</Button>
              </ButtonBox>
            </TextareaBox>
          </Flex>
          <Flex w="100%" direction={'column'}  className='makePromtLabelTextarea'>
            <label for="stop_sequence">stop_sequence</label>
            <textarea id="stop_sequence" />
          </Flex>
          <Flex w="100%" gridGap={{base:'0px', lg:'20px'}}  direction={{base:'column', lg:'row'}}>
            <Flex w="100%"  direction={'column'}  className='makePromtLabelInputTwo'>
              <label for=" temperature">temperature</label>
              <input type="text" id="temperature" />
            </Flex>
            <Flex w="100%"  direction={'column'} className='makePromtLabelInputTwo'>
              <label for="max_tokens">
                max_tokens
              </label>
              <input type="text" id="max_tokens" />
            </Flex>
          </Flex>

          <Flex w="100%" gridGap={{base:'0px', lg:'20px'}} direction={{base:'column', lg:'row'}}>
            <Flex w="100%" direction={'column'}  className='makePromtLabelInputTwo'>
              <label for="top_p">top_p</label> <input type="text" id="top_p" />
            </Flex>
            <Flex w="100%" direction={'column'}  className='makePromtLabelInputTwo'>
              <label for="frequency_penalty">frequency_penalty</label>
              <input type="text" id="frequency_penalty" />
            </Flex>
          </Flex>
          
          <Flex
          align={'center'}
          direction={{base:'column', sm:'row'}}
          justify={{base:'center', sm: 'flex-end'}}
          mt='15px'
          gridGap={'15px'}
          >
           <CancelBtn>수정</CancelBtn>
            <DeleteBtn>삭제</DeleteBtn>
          </Flex>
        </Container>
      </Box>
    </Layout>
  );
};

export default PromptDetail;
