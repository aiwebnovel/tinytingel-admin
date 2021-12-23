import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Apps from './routes/Apps';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Apps />
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default App;
