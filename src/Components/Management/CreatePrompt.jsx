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

const ResetBtn = styled.button`
  background-color: #E2E8F0;
  border: 1px solid #444;
  border-radius: 5px;
  color: #444;
  padding: 2px 25px;
  transition: all 300ms ease;

  &:hover {
    background-color: #E6F4F1;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
  }
`



const CreatePropmt = () => {
  return (
    <Layout>
      <Box padding="48px">
        <Container>
          <Flex w="100%" direction={'column'} className='makePromtLabelInput'>
            <label htmlFor="name">서비스명</label>
            <input type="text" id="name" />
          </Flex>
          <Flex  w="100%" direction={'column'}  className='makePromtLabelInput'>
            <label htmlFor="writer">
              작성자
            </label>
            <input type="text" id="writer" />
          </Flex>
          <Flex  w="100%" direction={'column'}  className='makePromtLabelInput'>
            <label htmlFor="engine">
              engine
            </label>
            <input type="text" htmlFor="engine" />
          </Flex>
        <Flex w="100%" direction={'column'}  className='makePromtLabelTextarea'>
            <label htmlFor="prompt">prompt </label>
            <TextareaBox>
              <textarea id="prompt" />
              <ButtonBox>
                <Button>사용자 입력부분</Button>
              </ButtonBox>
            </TextareaBox>
          </Flex>
          <Flex w="100%" direction={'column'}  className='makePromtLabelTextarea'>
            <label htmlFor="stop_sequence">stop_sequence</label>
            <textarea id="stop_sequence" />
          </Flex>
          <Flex w="100%" gridGap={{base:'0px', lg:'20px'}}  direction={{base:'column', lg:'row'}}>
            <Flex w="100%"  direction={'column'}  className='makePromtLabelInputTwo'>
              <label htmlFor="temperature">temperature</label>
              <input type="text" id="temperature" />
            </Flex>
            <Flex w="100%"  direction={'column'} className='makePromtLabelInputTwo'>
              <label htmlFor="max_tokens">
                max_tokens
              </label>
              <input type="text" id="max_tokens" />
            </Flex>
          </Flex>

          <Flex w="100%" gridGap={{base:'0px', lg:'20px'}} direction={{base:'column', lg:'row'}}>
            <Flex w="100%" direction={'column'}  className='makePromtLabelInputTwo'>
              <label htmlFor="top_p">top_p</label> <input type="text" id="top_p" />
            </Flex>
            <Flex w="100%" direction={'column'}  className='makePromtLabelInputTwo'>
              <label htmlFor="frequency_penalty">frequency_penalty</label>
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
           <CancelBtn>생성</CancelBtn>
            <ResetBtn>다시쓰기</ResetBtn>
          </Flex>
        </Container>
      </Box>
    </Layout>
  );
};

export default CreatePropmt;
