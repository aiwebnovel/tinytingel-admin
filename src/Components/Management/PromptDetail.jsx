import React from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import Layout from 'Common/Layout';

const PromptDetail = () => {
  return (
    <Layout>
      <Box padding="48px">
        <Box>
          <Flex w="100%">
            <label for="name">서비스명</label>
            <input type="text" id="name" />
          </Flex>
          <Flex w="100%">
            <label for="writer">
              작성자
              <input type="text" id="writer" />
            </label>
          </Flex>
          <Flex w="100%">
            <label for="engine">
              engine
              <input type="text" for="engine" />
            </label>
          </Flex>
          <Flex w="100%">
            <label for="prompt">prompt </label>
            <Box>
              <textarea id="prompt" />
              <Box>
                <Button>사용자 입력부분</Button>
              </Box>
            </Box>
          </Flex>
          <Flex w="100%">
            <label for="stop_sequence">stop_sequence</label>
            <textarea id="stop_sequence" />
          </Flex>
          <Flex w="100%">
            <Flex>
              <label for=" temperature">temperature</label>
              <input type="text" id="temperature" />
            </Flex>
            <Flex>
              <label for="max_tokens">
                max_tokens
                <input type="text" id="max_tokens" />
              </label>
            </Flex>
          </Flex>

          <Flex w="100%">
            <Flex>
              <label for="top_p">top_p</label> <input type="text" id="top_p" />
            </Flex>
            <Flex>
              <label for="frequency_penalty">frequency_penalty</label>
              <input type="text" id="frequency_penalty" />
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Layout>
  );
};

export default PromptDetail;
