//에러 페이지

import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Heading } from "@chakra-ui/react";
import styled from "styled-components";

const ErrorContainer = styled(Box)`
  width: 100%;
  height: 100vh;
  background-color: #f9f9f9;
`;

const ErrorPage = styled(Flex)`
  > h2 {
    font-size: 1.8rem;
    font-weight: 900;
    word-break: keep-all;
    line-height: 2rem;
    margin-bottom: 20px;
  }

  > h3 {
    font-size: 1.2rem;
  }
`;

const ImgBox = styled.div`
  > img {
    width: 250px;

    @media screen and (max-width: 480px) {
        width: 180px;
    }
  }
`;

const HomeBtn = styled.button`
  background-color: #4046b7;
  border: 1px solid #4046b7;
  border-radius: 15px;
  width: 100%;
  color: #fff;
  font-size: 1rem;
  padding: 3px 15px;
  cursor: pointer;
  margin-top: 25px;
  transition: all 300ms ease;

  &:hover {
    background-color: #ffce1f;
    color: #444;
  }
`;

const NotFound = () => {
  return (
    <ErrorContainer>
      <Flex h='100%' justify='center' align={"center"}>
        <ErrorPage direction={{base:'column', md:'row'}} align='center' gap="3em">
          <ImgBox>
            <img src='/404_error.png' alt='error' />
          </ImgBox>
          <Box
          textAlign={'center'}
          >
            <Heading as='h2' size='lg' color={'#444'}>
             404 NOT FOUND
            </Heading>
            <Link to='/'>
              <HomeBtn>HOME</HomeBtn>
            </Link>
          </Box>
        </ErrorPage>
      </Flex>
    </ErrorContainer>
  );
};

export default NotFound;
